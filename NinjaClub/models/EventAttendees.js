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
                    model: 'Members', // Tabeli nimi, millele viitab
                    key: 'MemberID',
                },
            },
            EventID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Events', // Tabeli nimi, millele viitab
                    key: 'EventID',
                },
            },
        }, {
            tableName: 'EventAttendees',
            timestamps: false,
        });

    // EventAttendees.associate = (models) => {
    //     EventAttendees.belongsTo(models.Events, {
    //         foreignKey: 'EventID',
    //     });
    //     EventAttendees.belongsTo(models.Members, {
    //         foreignKey: 'MemberID',
    //     });
    // };

    return EventAttendees;
};
