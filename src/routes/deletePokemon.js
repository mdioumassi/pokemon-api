const { Pokemon } = require('../db/sequelize');
const auth = require('../auth/auth');

module.exports = (app) => {
    app.delete('/api/pokemon/:id', auth, (req, res) => {
        const id = req.params.id;
        Pokemon.findByPk(id)
            .then(pokemon => {
                if (!pokemon) {
                    const message = `Le pokémon avec l'identifiant ${id} est introuvable.`;
                    return res.status(404).json({ message });
                }
                const pokemonDeleted = pokemon;
                return Pokemon.destroy({
                    where: {
                        id: pokemon.id
                    }
                }).then(_ => {
                    const message = `Le pokémon avec l'identifiant ${pokemonDeleted.id} a bien été supprimé.`;
                    res.json({ message, data: pokemonDeleted});
                });
            })
            .catch(err => {
                const message = `Le pokémon n'a pas pu être supprimé. Réessayez dans quelques instants.`;
                res.status(500).json({ message, data: err });
            });
    });
}