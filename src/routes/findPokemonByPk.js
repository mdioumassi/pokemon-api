const { Pokemon } = require('../db/sequelize');
const auth = require('../auth/auth');

module.exports = (app) => {
    app.get('/api/pokemons/:id', auth, (req, res) => {
        const id = req.params.id;
        Pokemon.findByPk(id)
        .then(pokemon => {
            const message = 'Le pokémon a bien été récupéré.';
            res.json({ message, data: pokemon });
        });
    });
}