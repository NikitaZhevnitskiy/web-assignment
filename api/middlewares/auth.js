module.exports = function(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        res.status(401).send('Include a token plz');
        return;
    }

    //TODO: validate token for requests that need it
    next()
};