const jwtSimple = require('jwt-simple')
    , bcrypt = require('bcryptjs');
const jwtSecret = 'top super secret password do not share';

exports.hash = function(password) {
    const hash =  bcrypt.hashSync(password, 10);
    return hash;
};

exports.compareHashes = function (pass1, pass2) {
   return bcrypt.compareSync(pass1,pass2);
};

exports.generateToken = function (username) {
    const payload = {
        username: username,
        // time: Date.now()
    };

    const token = jwtSimple.encode(payload, jwtSecret);
    return token;
};

exports.decodeToken = function (token) {
    try {
        const payload = jwtSimple.decode(token, jwtSecret);
        if (payload) {
            return payload.username;
        }
    }catch(err){}
    return null;
};
