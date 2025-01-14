module.exports = (sequelize, DataTypes) => {
    const EventAttendees = sequelize.define(
        'EventAttendees',
        {
            EventAttendeesID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                field: 'EventAttendeesID'
            },
            MemberID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Members', // Tabeli nimi, millele viitab
                    key: 'MemberID',
                },
                field: 'MemberID'
            },
            EventID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Events', // Tabeli nimi, millele viitab
                    key: 'EventID',
                },
                field: 'EventID'
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
