module.exports = (Sequelize, DataTypes) => {
    return Sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        // email: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     unique: true,
        //     validate: {
        //         isEmail: true
        //     }
        // },
        username: {
            type: DataTypes.STRING,
            unique: {msg: "Le nom d'utilisateur est déjà utilisé."},
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
}