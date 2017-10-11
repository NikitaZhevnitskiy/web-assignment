var express = require('express')
    , router = express.Router()
    , Validator = require('../helpers/validator')
    , auth = require('../middlewares/auth')
    , mongoose = require('mongoose')
    , UserRepository = require('../repositories/user_repo')

mongoose.connect('mongodb://localhost/test')

router.post('/', function(req, res) {

    const username = req.body.username.toLowerCase();
    const passwordInput = req.body.password;

    if (Validator.isValid(username) && Validator.isValid(passwordInput)){
        UserRepository.registerUser(username, passwordInput, function (err,user) {
            if(err) {
                res.send(err);
                return;
            }
            res.status(201).send(user._id);
        });
    } else {
        res.status(500).send('Check input fields')
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