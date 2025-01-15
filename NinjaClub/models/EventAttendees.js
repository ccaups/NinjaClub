module.exports = (sequelize, DataTypes) => {
    const EventAttendees = sequelize.define(
      'EventAttendees',
      {
        EventAttendeesID: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        MemberID: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Members', // Table name
            key: 'MemberID',
          },
        },
        EventID: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Events', // Table name
            key: 'EventID',
          },
        },
        RSVPStatus: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: 'EventAttendees',
        timestamps: false,
      }
    );
  
    return EventAttendees;
  };
  