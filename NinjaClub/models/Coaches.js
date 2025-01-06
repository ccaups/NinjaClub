module.exports = (sequelize, DataTypes) => {
    const Coach = sequelize.define(
      'Coach',
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
        Aadress: {
          type: DataTypes.TEXT,
          allowNull: false,
          field: 'Aadress'
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
        tableName: 'Coach',
        timestamps: false 
      }
    );
  
    return Coach;
  };
  