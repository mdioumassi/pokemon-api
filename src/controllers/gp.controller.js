const db = require('../models');
const GpService = db.gpservices;
const Op = db.Sequelize.Op;

exports.createData = (gpservice) => {
    return GpService.create({
        name: gpservice.name,
        logo: gpservice.logo,
        address: gpservice.address,
        code_postal: gpservice.code_postal,
        city: gpservice.city,
        current_country: gpservice.current_country,
        recipient_countries: gpservice.recipient_countries,
        phone_mobile: gpservice.phone_mobile,
        phone_fixe: gpservice.phone_fixe,
        phone_whatsapp: gpservice.phone_whatsapp,
        email: gpservice.email
    })
    .then((gpservice) => {
        console.log('>> Created GPService: ' + JSON.stringify(gpservice, null, 4));
        return gpservice;
    })
    .catch((err) => {
        console.log('>> Error while creating GPService: ', err);
    });
}

exports.findAll = (req, res) => {
    GpService.findAll()
        .then((gpservices) => {
            const message = 'La liste des GP a bien été récupérée.';
            res.json({ message, data: gpservices });
        })
        .catch((err) => {
            const message = 'La liste des GP n\'a pas pu être récupérée. Réessayez dans quelques instants.';
            res.status(500).json({ message, data: err });
        });
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    GpService.findByPk(id)
        .then((gpservice) => {
            if (gpservice) {
                const message = 'Le GP a bien été récupéré.';
                res.json({ message, data: gpservice });
            } else {
                const message = `Le GP avec l'id ${id} n'existe pas.`;
                res.status(404).json({ message });
            }
        })
        .catch((err) => {
            const message = `Le GP avec l'id ${id} n'a pas pu être récupéré. Réessayez dans quelques instants.`;
            res.status(500).json({ message, data: err });
        });
}