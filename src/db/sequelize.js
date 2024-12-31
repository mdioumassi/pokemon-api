const db = require('../models');
const gpservices = require('./mock-gpservices')
const users = require('./mock-users')
const services = require('./mock-services')

const gpController = require('../controllers/gp.controller')
const userController = require('../controllers/user.controller')
const serviceController = require('../controllers/service.controller')

const initDb = () => {
    return db.sequelize.sync({ force: true }).then(_ => {
        //GP Controller
        gpservices.forEach(gpService => {
            gpController.createData(gpService);
        });
        //User Controller
        users.forEach(user => {
            userController.createData(user);
        });
        //Service Controller
        services.forEach(service => {
            serviceController.createData(service);
        });
        console.log('La base de donnée a bien été initialisée !')
    })
}

module.exports = {
    initDb
}