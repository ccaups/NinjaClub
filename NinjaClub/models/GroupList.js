module.exports = (sequelize, DataTypes) => {
    const GroupList = sequelize.define(
      'GroupList',
      {
        GroupID: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          field: 'GroupID'
        },
        CoachID: {
          type: DataTypes.INTEGER,
          allowNull: true,
          field: 'CoachID'
        },
        MemberID: {
          type: DataTypes.INTEGER,
          allowNull: true,
          field: 'MemberID'
        },
        GroupName: {
          type: DataTypes.TEXT,
          allowNull: false,
          field: 'GroupName'
        },
        Schedule: {
          type: DataTypes.TEXT,
          allowNull: false,
          field: 'Schedule'
        },
      },
      {
        tableName: 'GroupList',
        timestamps: false
      }
    );
  
    return GroupList;
  };
  