var express = require('express')
    , router = express.Router()
    , User = require('../models/user')
    // , Comment = require('../models/comment')
    // , auth = require('../middlewares/auth')

router.post('/', function(req, res) {
    User.create(req.body.username, req.body.password, function (err,user) {
        if(err) res.send("ERR");
        res.send(user._id);
    });
});

router.get('/', function(req, res) {
    User.get({},function (err,users) {
        if(err) res.send("ERR");
        console.log("ALL ok")
        res.send(users);
        // res.send("POSTED");
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