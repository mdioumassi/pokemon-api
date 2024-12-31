const { User } = require('../db/sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const privatekey = require('../auth/private_key');

module.exports = (app) => {
    app.post('/api/login', (req, res) => {
        const { username, password } = req.body;
        User.findOne({
            where: {
                username: username
            }
        })
        .then(user => {
            if (!user) {
                const message = 'L\'utilisateur n\'existe pas.';
                return res.status(404).json({ message });
            }
            bcrypt.compare(password, user.password)
                .then(valid => {
                    if (!valid) {
                        const message = 'Le mot de passe est incorrect.';
                        return res.status(401).json({ message });
                    }
                    //JWT
                    const token = jwt.sign(
                        { userId: user.id },
                        privatekey,
                        { expiresIn: '24h' }
                    );
                    const message = 'Vous êtes connecté.';
                    res.json({ message, data: user, token });
                });
        })
        .catch(err => {
            const message = 'L\'utilisateur n\'a pas pu être connecté. Réessayez dans quelques instants.';
            res.status(500).json({ message, data: err });
        });
    });
}