module.exports = (sequelize, DataTypes) => {
    const GroupList = sequelize.define(
        'GroupLists',
        {
            GroupID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            GroupName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Schedule: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            MemberID: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            CoachID: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        }
    );
    console.log(GroupList === sequelize.models.GroupList);
    return GroupList;
}







// module.exports = (sequelize, DataTypes) => {
//     const Coach = sequelize.define(
//         'Coaches',
//         {
//             CoachID: {
//                 type: DataTypes.INTEGER,
//                 primaryKey: true,
//                 autoIncrement: true,
//             },
//             FirstName: {
//                 type: DataTypes.STRING,
//                 allowNull: false,
//             },
//             LastName: {
//                 type: DataTypes.STRING,
//                 allowNull: false,
//             },
//             Address: {
//                 type: DataTypes.STRING,
//                 allowNull: false,
//             },
//             PhoneNumber: {
//                 type: DataTypes.STRING,
//                 allowNull: false,
//             },
//             Email: {
//                 type: DataTypes.STRING,
//                 allowNull: false,
//             },
//         },
//         {
//             timestamps: false,
//         }
//     );

//     const GroupList = sequelize.define(
//         'GroupLists',
//         {
//             GroupID: {
//                 type: DataTypes.INTEGER,
//                 primaryKey: true,
//                 autoIncrement: true,
//             },
//             GroupName: {
//                 type: DataTypes.STRING,
//                 allowNull: false,
//             },
//             Schedule: {
//                 type: DataTypes.STRING,
//                 allowNull: false,
//             },
//             MemberID: {
//                 type: DataTypes.INTEGER,
//                 allowNull: false,
//             },
//             CoachID: {
//                 type: DataTypes.INTEGER,
//                 allowNull: false,
//             },
//         },
//         {
//             timestamps: false,
//         }
//     );

//     Member.hasMany(GroupList, {
//         foreignKey: 'MemberID',
//         as: 'Groups',
//     });
//     GroupList.belongsTo(Member, {
//         foreignKey: 'MemberID',
//         as: 'Member',
//     });

//     Coach.hasMany(GroupList, {
//         foreignKey: 'CoachID',
//         as: 'Groups',
//     });
//     GroupList.belongsTo(Coach, {
//         foreignKey: 'CoachID',
//         as: 'Coach',
//     });

//     return { Coach, GroupList };
// };