module.exports = (sequelize, DataTypes) => {
    const Events = sequelize.define(
        'Events',
        {
            EventID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: 'EventID'
            },
            CoachID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'CoachID'
            },
            Name: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'Name'
            },
            Date: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'Date'
            },
            Location: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'Location'
            },
            Description: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'Description'
            },
        },
        {
            timestamps: false,
        }
    );

    // Events.associate = (models) => {
    //     Events.belongsTo(models.Coaches, {
    //         foreignKey: 'CoachID',
    //     });
    //     Events.hasMany(models.EventAttendees, {
    //         foreignKey: 'EventID',
    //     });
    // };

    return Events;
};
