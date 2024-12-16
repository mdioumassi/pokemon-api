const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemon')
const userModel = require('../models/user')
const pokemons = require('./mock-pokemon')
const bcrypt = require('bcrypt')

sequelize = new Sequelize('pokemon-db', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
        timezone: 'Etc/GMT-2',
    },
    logging: true
})

const Pokemon = PokemonModel(sequelize, DataTypes);
const User = userModel(sequelize, DataTypes);

const initDb = () => {
    return sequelize.sync({force: true}).then(_ => {
        pokemons.forEach(pokemon => {
            Pokemon.create({
                name: pokemon.name,
                hp: pokemon.hp,
                cp: pokemon.cp,
                picture: pokemon.picture,
                types: pokemon.types
            })
        })

        bcrypt.hash('admin', 10).then(hash => {
            User.create({
                username: 'admin',
                password: hash
            })
            .then(user => console.log(user.toJSON()))
        })

        console.log('La base de donnée a bien été initialisée !')
    })
}

module.exports = {
    initDb, Pokemon, User
}