const db = require('../models');
const bcrypt = require('bcrypt')
const User = db.users;

exports.createData = (user) => {
    return bcrypt.hash(user.password, 10).then(hash => {
        return User.create({
            username: user.username,
            email: user.email,
            password: hash,
            firstname: user.firstname,
            lastname: user.lastname,
            phone: user.phone,
            role: user.role
        })
        .then((user) => {
            console.log('>> Created user: ' + JSON.stringify(user, null, 4));
            return user;
        })
        .catch((err) => {
            console.log('>> Error while creating user: ', err);
        });
    })
}

exports.findAll = (req, res) => {
    User.findAll()
        .then((users) => {
            const message = 'La liste des utilisateurs a bien été récupérée.';
            res.json({ message, data: users });
        })
        .catch((err) => {
            const message = 'La liste des utilisateurs n\'a pas pu être récupérée. Réessayez dans quelques instants.';
            res.status(500).json({ message, data: err });
        });
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    User.findByPk(id)
        .then((user) => {
            if (user) {
                const message = 'L\'utilisateur a bien été récupéré.';
                res.json({ message, data: user });
            } else {
                const message = `L'utilisateur avec l'id ${id} n'existe pas.`;
                res.status(404).json({ message });
            }
        })
        .catch((err) => {
            const message = `L'utilisateur avec l'id ${id} n'a pas pu être récupéré. Réessayez dans quelques instants.`;
            res.status(500).json({ message, data: err });
        });
}