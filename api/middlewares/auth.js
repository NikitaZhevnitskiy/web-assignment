const jwtSimple = require('jwt-simple');
const bcrypt = require('bcryptjs');
User = require('../models/user');


module.exports = function(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        res.status(401).send('Include a token plz');
        return;
    }
    //TODO: validate token
    next()
};




// "use strict";
// const jwtSimple = require('jwt-simple');
// const bcrypt = require('bcryptjs');
//
// //TODO: refactor service logic
// module.exports = function() {
//
//     const jwtSecret = 'top super secret password do not share';
//
//     const users = [];
//
//     const AuthService = {
//         getUsers: function () {
//             return users;
//         },
//         addUser: function (user) {
//             users.push(user);
//         },
//         hashUserWithPassword: function (username, password) {
//             const userWithHashedPassword = {
//                 username: username,
//                 password: bcrypt.hashSync(password, 10),
//             };
//             return userWithHashedPassword;
//         },
//         findUserByUsername: function (username) {
//             return users.find(potentialMatch => potentialMatch.username === username);
//         },
//         checkPassword: function (matchedUser, password) {
//             const passwordMatches = bcrypt.compareSync(
//                 password,
//                 matchedUser.password
//             );
//             return passwordMatches;
//         },
//         generateToken: function (user) {
//             const payload = {
//                 username: user.username,
//             };
//             const token = jwtSimple.encode(payload, jwtSecret);
//             return token;
//         },
//         getLoggedUser: function (token) {
//             const payload = jwtSimple.decode(token, jwtSecret);
//             const username = payload.username;
//             const user = users.find(u => u.username === username);
//             return user;
//         }
//     };
//     return AuthService;
// };