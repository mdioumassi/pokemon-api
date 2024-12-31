module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Service', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: "Le type ne doit pas être vide."},
                notNull: {msg: "Le type est obligatoire."}
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: "La description ne doit pas être vide."},
                notNull: {msg: "La description est obligatoire."}
            }
        }
    })
}
