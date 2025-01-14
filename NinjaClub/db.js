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

// Import models
db.Members = require("./models/Members")(sequelize, DataTypes);
db.GroupTraining = require("./models/GroupTraining")(sequelize, DataTypes);
db.Coaches = require("./models/Coaches")(sequelize, DataTypes);
db.Events = require("./models/Events")(sequelize, DataTypes);
db.EventAttendees = require("./models/EventAttendees")(sequelize, DataTypes);

// Define relationships

// Coaches and GroupTraining
db.Coaches.hasMany(db.GroupTraining, { foreignKey: "CoachID" });
db.GroupTraining.belongsTo(db.Coaches, { foreignKey: "CoachID" });

// Members and GroupTraining
db.Members.hasMany(db.GroupTraining, { foreignKey: "MemberID" });
db.GroupTraining.belongsTo(db.Members, { foreignKey: "MemberID" });

// Coaches and Events
db.Coaches.hasMany(db.Events, { foreignKey: "CoachID" });
db.Events.belongsTo(db.Coaches, { foreignKey: "CoachID" });

// Events and EventAttendees
db.Events.hasMany(db.EventAttendees, { foreignKey: "EventID" });
db.EventAttendees.belongsTo(db.Events, { foreignKey: "EventID" });

// Members and EventAttendees
db.Members.hasMany(db.EventAttendees, { foreignKey: "MemberID" });
db.EventAttendees.belongsTo(db.Members, { foreignKey: "MemberID" });

// Synchronize models
const sync = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log("Models have been synchronized successfully!");
    } catch (error) {
        console.error("Model synchronization failed: " + error);
    }
};

// Export the database object and sync function
module.exports = { db, sync };
