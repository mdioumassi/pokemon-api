const dbconfig = require('../config/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbconfig.DB, dbconfig.USER, dbconfig.PASSWORD, {
    host: dbconfig.HOST,
    dialect: dbconfig.dialect,
    dialectOptions: dbconfig.dialectOptions,
    logging: dbconfig.logging
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.gpservices = require('../models/gp.model.js')(sequelize, Sequelize);
db.users = require('../models/user.model.js')(sequelize, Sequelize);
db.services = require('../models/service.model.js')(sequelize, Sequelize);

db.users.hasMany(db.gpservices, { as: "gpservices" });
db.gpservices.belongsTo(db.users);

module.exports = db;