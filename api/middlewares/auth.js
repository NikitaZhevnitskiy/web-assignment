const authService = require('../services/auth_service');

module.exports = function(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        res.status(401).send('Include a token plz');
        return;
    }

    var username = authService.decodeToken(token);
    if(!username){
        res.status(401).send('Wrong token');
        return;
    }

    next()
};