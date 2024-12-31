module.exports = (Sequelize, DataTypes) => {
    return Sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'user',
            validate: {
                isIn: [['user', 'admin']]
            }
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: "Le prénom ne doit pas être vide."},
                notNull: {msg: "Le prénom est obligatoire."}
            }
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: "Le nom ne doit pas être vide."},
                notNull: {msg: "Le nom est obligatoire."}
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: "Le numéro de téléphone ne doit pas être vide."},
                notNull: {msg: "Le numéro de téléphone est obligatoire."}
            }
        },
        username: {
            type: DataTypes.STRING,
            unique: {msg: "Le nom d'utilisateur est déjà utilisé."},
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}