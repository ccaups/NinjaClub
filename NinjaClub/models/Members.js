module.exports = (sequelize, DataTypes) => {
    const Members = sequelize.define(
      'Members',
      {
        MemberID: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          field: 'MemberID'
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
        RegistrationDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          field: 'RegistrationDate'
        },
        Active: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          field: 'Active'
        },
        Level: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: 'Level'
        },
      },
      {
        tableName: 'Members',
        timestamps: false
      }
    );
  
    return Members;
  };
  