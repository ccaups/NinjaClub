module.exports = (sequelize, DataTypes) => {
    const EventAttendees = sequelize.define(
        'EventAttendees',
        {
            EventID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            MemberID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            RSVPStatus: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        }
    );

    EventAttendees.associate = (models) => {
        EventAttendees.belongsTo(models.Events, {
            foreignKey: 'EventID',
        });
        EventAttendees.belongsTo(models.Members, {
            foreignKey: 'MemberID',
        });
    };

    return EventAttendees;
};
