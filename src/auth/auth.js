const jwt = require('jsonwebtoken');
const privatekey = require('../auth/private_key');

module.exports = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            const message = 'Vous n\'êtes pas connecté.';
            return res.status(401).json({ message });
        }
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, privatekey, (err, decodedToken) => {
            if (err) {
                const message = `L'utilisateur n'est pas autorisé à accéder à cette ressource.`;
                return res.status(401).json({ message, data: err });
            }
    
            const userId = decodedToken.userId;
            if (req.body.userId && req.body.userId !== userId) {
                const message = `L'identifiant de l'utilisateur est invalide.`;
                return res.status(401).json({ message });
            } else {
                next();
            }
        });

    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
}