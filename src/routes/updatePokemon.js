const { Pokemon } = require('../db/sequelize');
const { ValidationError, UniqueConstraintError } = require('sequelize');
const auth = require('../auth/auth');

module.exports = (app) => {
    app.put('/api/pokemon/:id', auth, (req, res) => {
        const id = req.params.id;
        Pokemon.update(req.body, {
            where: {
                id: id
            }
        })
        .then(_ => {
           return Pokemon.findByPk(id)
            .then(pokemon => {
                if (!pokemon) {
                    const message = `Le pokémon avec l'identifiant ${id} est introuvable.`;
                    return res.status(404).json({ message });
                }
                const message = `Le pokémon ${pokemon.name} a bien été modifié.`;
                res.json({ message, data: pokemon });
            });
        })
        .catch(err => {
            if(err instanceof ValidationError) {
                return res.status(400).json({ message: err.message, data: err });
            }
            if (err instanceof UniqueConstraintError) {
                return res.status(400).json({ message: err.message, data: err });
            }
            const message = `Le pokémon n'a pas pu être modifié. Réessayez dans quelques instants.`;
            res.status(500).json({ message, data: err });
        });
    });
}