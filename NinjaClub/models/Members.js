module.exports = (sequelize, DataTypes) => {
    const Members = sequelize.define(
        'Members',
        {
            MemberID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            FirstName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            LastName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Address: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            PhoneNumber: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            RegistrationDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            Active: {
                type: DataTypes.BOOLEAN, 
                allowNull: false,
            },
            Level: {
                type: DataTypes.INTEGER, 
                allowNull: false,
            },
        },
        {
            timestamps: false,
        }
    );

    console.log(Members === sequelize.models.Members);
    return Members;
}