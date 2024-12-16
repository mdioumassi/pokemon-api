const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const sequelize = require('./src/db/sequelize');


const app = express();
const port = process.env.PORT || 3000;


app
.use(favicon(__dirname + '/favicon.ico'))
.use(bodyParser.json())

//sequelize.initDb();

app.get('/', (req, res) => {
    res.json('Hello Heroku!');
});
// Ici, nous allons créer nos routes
require('./src/routes/findAllPokemons')(app);
require('./src/routes/findPokemonByPk')(app);
require('./src/routes/createPokemon')(app);
require('./src/routes/updatePokemon')(app);
require('./src/routes/deletePokemon')(app);
require('./src/routes/login')(app);

//On ajoute une route pour gérer les erreurs 404
app.use((req, res) => {
    const message = `La ressource demandée n'existe pas : ${req.url}`;
    res.status(404).json({ message });
});

app.listen(port, () => console.log(`Notre application Node est demarrée sur : http://localhost:${port}!`));
