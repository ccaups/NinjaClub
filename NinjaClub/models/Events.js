module.exports = (sequelize, DataTypes) => {
    const Events = sequelize.define(
        'Events',
        {
            EventID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            CoachID: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            Name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Date: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Location: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Description: {
                type: DataTypes.STRING,
                allowNull: true,
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
