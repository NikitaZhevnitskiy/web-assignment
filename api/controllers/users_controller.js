var express = require('express')
    , router = express.Router()
    , User = require('../models/user')
    , Validator = require('../helpers/validator')
    , auth = require('../middlewares/auth');

router.post('/', function(req, res) {
    const username = req.body.username.toLowerCase();
    const passwordInput = req.body.password;

    if (Validator.isValid(username) && Validator.isValid(passwordInput)){
        User.create(username, passwordInput, function (err,user) {
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
    User.get({},function (err,users) {
        if(err) {
         res.status(500).send(err);
         return;
        }
        res.status(200).send(users);
    });
});

module.exports = router;



// router.post('/', auth, function(req, res) {
//     user = req.user.id
//     text = req.body.text
//     Comment.create(user, text, function (err, comment) {
//         res.redirect('/')
//     })
// })
//
// router.get('/:id', function(req, res) {
//     Comment.get(req.params.id, function (err, comment) {
//         res.render('comments/comment', {comment: comment})
//     })
// })