const { Sequelize, DataTypes} = require("sequelize");

const sequelize = new Sequelize (
    process.env.DB_DATANAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOSTNAME,
        dialect: "mariadb",
        logging:console.log,
    }
);

(async () => {
    try{
        await sequelize.authenticate();
        console.log("Connection has been established successfully.")
    } catch ( error) {
        console.error("Connection failed: " + error)
    }
})();

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.members = require("./models/members")(sequelize, DataTypes);

const sync = (async () => {
    await sequelize.sync({alter: true});
    console.log("Models have been synchronised successfully!")
});

module.exports = {db , sync};


const Coach = require('./models/coaches')(sequelize, DataTypes);
const GroupList = require('./models/grouplist')(sequelize, DataTypes);
const Members = require('./models/members')(sequelize, DataTypes);
const Events = require('./models/events')(sequelize, DataTypes);
const EventAttendees = require('./models/eventattendees')(sequelize, DataTypes);


Coach.hasMany(GroupList, { foreignKey: 'CoachID' });
GroupList.belongsTo(Coach, { foreignKey: 'CoachID' });

Members.hasMany(GroupList, { foreignKey: 'MemberID' });
GroupList.belongsTo(Members, { foreignKey: 'MemberID' });
Coach.hasMany(Events, { foreignKey: 'CoachID' });
Events.belongsTo(Coach, { foreignKey: 'CoachID' });

module.exports = {
  sequelize,
  Coach,
  GroupList,
  Members,
  Events,
  EventAttendees
};