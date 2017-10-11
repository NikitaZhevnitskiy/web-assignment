var express = require('express')
    , router = express.Router()
    , User = require('../models/user')
    , Validator = require('../helpers/validator')
    , auth = require('../middlewares/auth')
    , UserRepository = require('../repositories/user_repo');

router.post('/login', function(req, res) {
    const userBody = req.body
    if (Validator.isValid(userBody.username) && Validator.isValid(userBody.password)){
        const hashedPass = UserRepository.hash(userBody.password);
            // 1. finn brukeren by brukernavn
            // console.log(userBody.username);
            UserRepository.getUserByUsername(userBody.username, function (err, user) {
                if(err) {
                    res.status(500).send(err);
                    return;
                }
                // 2. sammenlikn passord

                //TODO: WTF different hash for same value
                console.log(user.password);
                console.log(hashedPass);
                console.log("hash for 7: "+UserRepository.hash('7'));
                if(user.password === hashedPass){
                    //TODO: 4. hvis rett: lag token
                    res.status(200).send(user);
                } else {
                    // 3. hvis feil: 401 Unauthorized
                    res.status(401).send('wrong password')
                }
            });
    } else {
        res.status(400).send('Check input fields. Username and password')
    }

});
module.exports = router;


// module.exports = function(app){
//
//     app.get('/hello', (req, res) => {
//         res.send('hello');
//     });
//
//     app.get('/users', (req, res) => {
//         res.send(authService.getUsers());
//     });
//
//     app.post('/users', (req, res) => {
//         const user = req.body;
//         if (!validator.isValid(user.username)) {res.status(400).send('Must contain username');return;}
//         if (!validator.isValid(user.password)) {res.status(400).send('Must contain password');return;}
//         const userWithHashedPassword = authService.hashUserWithPassword(user.username, user.password);
//         authService.addUser(userWithHashedPassword)
//         res.status(201).send();
//     });
//
//     app.post('/login', (req, res) => {
//         const user = req.body;
//
//         //validation
//         if (!validator.isValid(user.username)) {res.status(400).send('Must contain username');return;}
//         if (!validator.isValid(user.password)) {res.status(400).send('Must contain password');return;}
//
//     // 1. finn brukeren by brukernavn
//         const matchedUser = authService.findUserByUsername(user.username);
//         if (matchedUser === null) {res.status(401).send('No such user');return;}
//
//     // 2. sammenlikn passord
//         const passwordMatches = authService.checkPassword(matchedUser,user.password);
//
//     // 3. hvis feil: 401 Unauthorized
//         if (!passwordMatches) {res.status(401).send('Wrong password');return;}
//
//     // 4. hvis rett: lag token
//         const tokken = authService.generateToken(user);
//
//         res.status(201).send(tokken);
//     });
//
//     app.get('/me', (req, res) => {
//         const token = req.header('Authorization');
//         if (!token) {res.status(401).send('Include a token plz');return;}
//         const user = authService.getLoggedUser(token);
//         res.send(user);
//     });
//
// };