
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('GP', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {msg: "Le nom du GP est déjà utilisé."},
            validate: {
                notEmpty: {msg: "Le nom ne doit pas être vide."},
                notNull: {msg: "Le nom est obligatoire."}
            }
        },
        logo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: {msg: "L'image du GP doit être une URL."},
                notNull: {msg: "L'image est obligatoire."}
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: "L'adresse ne doit pas être vide."},
                notNull: {msg: "L'adresse est obligatoire."}
            }
        },
        code_postal: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: "Le code postal ne doit pas être vide."},
                notNull: {msg: "Le code postal est obligatoire."},
                is: {
                    args: /^[0-9]{5}$/,
                    msg: "Le code postal doit être composé de 5 chiffres."
                }
            }
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: "La ville ne doit pas être vide."},
                notNull: {msg: "La ville est obligatoire."}
            }
        },
        phone_mobile: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: "Le numéro de téléphone ne doit pas être vide."},
                notNull: {msg: "Le numéro de téléphone est obligatoire."},
                is: {
                    args: /^0[1-9]([-. ]?[0-9]{2}){4}$/,
                    msg: "Le numéro de téléphone doit être un numéro français."
                }
            }
        },
        phone_fixe: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                is: {
                    args: /^0[1-9]([-. ]?[0-9]{2}){4}$/,
                    msg: "Le numéro de téléphone doit être un numéro français."
                }
            }
        },
        phone_whatsapp: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: "Le numéro de téléphone WhatsApp ne doit pas être vide."},
                notNull: {msg: "Le numéro de téléphone WhatsApp est obligatoire."},
                is: {
                    args: /^0[1-9]([-. ]?[0-9]{2}){4}$/,
                    msg: "Le numéro de téléphone WhatsApp doit être un numéro français."
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: "L'email ne doit pas être vide."},
                notNull: {msg: "L'email est obligatoire."},
                isEmail: {msg: "L'email doit être une adresse email valide."}
            }
        },
        current_country: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: "Le pays ne doit pas être vide."},
                notNull: {msg: "Le pays est obligatoire."}
            }
        },
        recipient_countries: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('recipient_countries').split(',');
            },
            set(recipient_countries) {
                this.setDataValue('recipient_countries', recipient_countries.join());
            },
            // validate: {
            //     isRecipientCountriesValid(value) {
            //         const recipient_countries = value.split(',');
            //         if(!value) {
            //             throw new Error('Le GP doit avoir au moins un pays destinataire.');
            //         }
            //         recipient_countries.forEach(country => {
            //             if (!validRecipientCountries.includes(country)) {
            //                 throw new Error(`Le pays destinataire d'un GP doit être parmi ${validRecipientCountries}.`);
            //             }
            //         });
            //     }
            // }
        }    
    })
}