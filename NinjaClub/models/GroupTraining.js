module.exports = (sequelize, DataTypes) => {
  const GroupTraining = sequelize.define(
      'GroupTraining',
      {
          GroupID: {
              type: DataTypes.INTEGER,
              primaryKey: true,
              autoIncrement: true,
              field: 'GroupID',
          },
          CoachID: {
              type: DataTypes.INTEGER,
              allowNull: true,
              field: 'CoachID',
          },
          MemberID: {
              type: DataTypes.INTEGER,
              allowNull: true,
              field: 'MemberID',
          },
          GroupName: {
              type: DataTypes.TEXT,
              allowNull: false,
              field: 'GroupName',
          },
          Schedule: {
              type: DataTypes.TEXT,
              allowNull: false,
              field: 'Schedule',
          },
      },
      {
          tableName: 'GroupList',
          timestamps: false,
      }
  );

  GroupTraining.associate = (models) => {
      GroupTraining.belongsTo(models.Coach, {
          foreignKey: 'CoachID',
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
      });
      GroupTraining.belongsTo(models.Member, {
        foreignKey: 'MemberID',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
  };

  

  return GroupTraining;
};
