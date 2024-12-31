const db = require('../models');
const Service = db.services;


exports.createData = (service) => {
    return Service.create({
        type: service.type,
        description: service.description,
    })
    .then((service) => {
        console.log('>> Created Service: ' + JSON.stringify(service, null, 4));
        return service;
    })
    .catch((err) => {
        console.log('>> Error while creating Service: ', err);
    });
}

exports.findAll = (req, res) => {
    Service.findAll()
        .then((services) => {
            const message = 'La liste des services a bien été récupérée.';
            res.json({ message, data: services });
        })
        .catch((err) => {
            const message = 'La liste des services n\'a pas pu être récupérée. Réessayez dans quelques instants.';
            res.status(500).json({ message, data: err });
        });
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    Service.findByPk(id)
        .then((service) => {
            if (service) {
                const message = 'Le service a bien été récupéré.';
                res.json({ message, data: service });
            } else {
                const message = `Le service avec l'id ${id} n'existe pas.`;
                res.status(404).json({ message });
            }
        })
        .catch((err) => {
            const message = `Le service avec l'id ${id} n'a pas pu être récupéré. Réessayez dans quelques instants.`;
            res.status(500).json({ message, data: err });
        });
}