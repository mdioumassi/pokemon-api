const express = require('express');
const favicon = require('serve-favicon');
const sequelize = require('./src/db/sequelize');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
var corsOptions = {
    origin: "http://localhost:8081"
};

const port = process.env.PORT || 3000;


app
.use(favicon(__dirname + '/favicon.ico'))
.use(bodyParser.json())
.use(express.json())
.use(express.urlencoded({ extended: true }));   


// On initialise la base de données
sequelize.initDb();

// require('./src/routes/gp.routes')(app);
// Route pour récupérer la liste des GP
require('./src/routes/gp.routes')(app);
require('./src/routes/user.routes')(app);
require('./src/routes/service.routes')(app);


//On ajoute une route pour gérer les erreurs 404
app.use((req, res) => {
    const message = `La ressource demandée n'existe pas : ${req.url}`;
    res.status(404).json({ message });
});

app.listen(port, () => console.log(`Notre application Node est demarrée sur : http://localhost:${port}!`));
