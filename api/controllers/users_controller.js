var express = require('express')
    , router = express.Router()
    , Validator = require('../helpers/validator')
    , auth = require('../middlewares/auth')
    , mongoose = require('mongoose')
    , UserRepository = require('../repositories/user_repo')
    , AuthService = require('../services/auth_service');

mongoose.connect('mongodb://localhost/test')

router.post('/', function(req, res) {
    console.log(req.body)
    const email = req.body.email.toLowerCase();
    const passwordInput = req.body.password;

    if (Validator.isValid(email) && Validator.isValid(passwordInput)){
        const hashedPassword = AuthService.hash(passwordInput);
        console.log(passwordInput + "_____" + hashedPassword);
        UserRepository.registerUser(email, hashedPassword, function (err,user) {
            if(err) {
                res.status(401).send(JSON.stringify(err));
                return;
            }
            res.status(201).send(user._id);
            // res.status(201).redirect('/login');
        });
    } else {
        res.status(401).send('Check input fields')
    }
});

router.get('/', auth, function(req, res) {
    UserRepository.getAll({}, function (err, users) {
        if(err) {
            res.status(500).send(err);
            return;
        }
        res.status(200).send(users);
    })
});

module.exports = router;