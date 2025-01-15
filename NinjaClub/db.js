const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATANAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOSTNAME,
    dialect: "mariadb",
    logging: console.log,
  }
);

// Test connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Connection failed: " + error);
  }
})();

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Members = require('./models/Members')(sequelize, DataTypes);
db.GroupList = require('./models/GroupList')(sequelize, DataTypes);
db.Coaches = require('./models/Coaches')(sequelize, DataTypes);
db.Events = require('./models/Events')(sequelize, DataTypes);
db.EventAttendees = require('./models/EventAttendees')(sequelize, DataTypes);

// Define relationships
db.Coaches.hasMany(db.GroupList, { foreignKey: 'CoachID' });
db.GroupList.belongsTo(db.Coaches, { foreignKey: 'CoachID' });

db.Members.hasMany(db.GroupList, { foreignKey: 'MemberID' });
db.GroupList.belongsTo(db.Members, { foreignKey: 'MemberID' });

db.Coaches.hasMany(db.Events, { foreignKey: "CoachID" });
db.Events.belongsTo(db.Coaches, { foreignKey: "CoachID" });

db.Events.hasMany(db.EventAttendees, { foreignKey: "EventID" });
db.EventAttendees.belongsTo(db.Events, { foreignKey: "EventID" });

db.Members.hasMany(db.EventAttendees, { foreignKey: "MemberID" });
db.EventAttendees.belongsTo(db.Members, { foreignKey: "MemberID" });

db.Coaches.belongsTo(db.GroupList, { foreignKey: 'GroupID' });

// Sync models
const sync = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Models have been synchronized successfully!");
  } catch (error) {
    console.error("Model synchronization failed: " + error);
  }
};

module.exports = { db, sync };
