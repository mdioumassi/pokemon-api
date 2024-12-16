const validTypes = ['Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik', 'Poison', 'Fée', 'Vol', 'Combat', 'Psy', 'Acier', 'Roche', 'Sol', 'Glace', 'Dragon', 'Spectre', 'Ténèbres'];

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {msg: "Le nom du pokémon est déjà utilisé."},
            validate: {
                notEmpty: {msg: "Le nom ne doit pas être vide."},
                notNull: {msg: "Le nom est obligatoire."}
            }
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {msg: "Le nombre de points de vie doit être un entier."},
                notNull: {msg: "Le nombre de points de vie est obligatoire."},
                min: {args: [0], msg: "Le nombre de points de vie doit être supérieur ou égal à 0."},
                max: {args: [999], msg: "Le nombre de points de vie doit être inférieur ou égal à 999."}
            }
        },
        cp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {msg: "Le nombre de points de dégâts doit être un entier."},
                notNull: {msg: "Le nombre de points de dégâts est obligatoire."},
                min: {args: [0], msg: "Le nombre de points de vie doit être supérieur ou égal à 0."},
                max: {args: [999], msg: "Le nombre de points de vie doit être inférieur ou égal à 999."}
            }
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: {msg: "L'image du pokémon doit être une URL."},
                notNull: {msg: "L'image est obligatoire."}
            }
        },
        types: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('types').split(',');
            },
            set(types) {
                this.setDataValue('types', types.join());
            },
            validate: {
                isTypesValid(value) {
                    const types = value.split(',');
                    if(!value) {
                        throw new Error('Le pokémon doit avoir un type.');
                    }
                    if (types.length > 3) {
                        throw new Error('Un pokémon ne peut pas avoir plus de trois types.');
                    }
                    types.forEach(type => {
                        if (!validTypes.includes(type)) {
                            throw new Error(`Le type d'un pokemon doit être parmi ${validTypes}.`);
                        }
                    });
                }
            }
        }        
    });
}