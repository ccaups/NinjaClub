module.exports = (sequelize, DataTypes) => {
    const Coaches = sequelize.define(
      'Coaches',
      {
        CoachID: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          field: 'CoachID'
        },
        GroupID: {
          type: DataTypes.INTEGER,
          allowNull: true,
          field: 'GroupID'
        },
        FirstName: {
          type: DataTypes.TEXT,
          allowNull: false,
          field: 'FirstName'
        },
        LastName: {
          type: DataTypes.TEXT,
          allowNull: false,
          field: 'LastName'
        },
        Address: {
          type: DataTypes.TEXT,
          allowNull: false,
          field: 'Address'
        },
        PhoneNumber: {
          type: DataTypes.TEXT,
          allowNull: false,
          field: 'PhoneNumber'
        },
        Email: {
          type: DataTypes.TEXT,
          allowNull: false,
          field: 'Email'
        },
      },
      {
        tableName: 'Coaches',
        timestamps: false 
      }
    );
  
    return Coaches;
  };
  