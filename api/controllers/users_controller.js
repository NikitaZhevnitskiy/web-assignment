var express = require('express')
    , router = express.Router()
    , Validator = require('../helpers/validator')
    , auth = require('../middlewares/auth')
    , UserRepository = require('../repositories/user_repo')
    , AuthService = require('../services/auth_service');

router.post('/', function(req, res) {
    // console.log(req.body)
    const email = req.body.email.toLowerCase();
    const passwordInput = req.body.password;

    if (Validator.isValid(email) && Validator.isValid(passwordInput)){
        const hashedPassword = AuthService.hash(passwordInput);
        // console.log(passwordInput + "_____" + hashedPassword);
        UserRepository.registerUser(email, hashedPassword, function (err,user) {
            if(err) {
                res.status(409).send(JSON.stringify(err));
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

//TODO: handle all errors in list requests

router.get('/list', auth, function (req, res) {
    const email = AuthService.decodeToken(req.header('Authorization'));
    UserRepository.getList(email, function (err, list) {
        if(err) {
            res.status(404).send(err);
            return;
        }
        res.status(200).json({todolist:list});
    })
});
router.put('/list', auth, function (req, res) {
    const body = req.body;
    const email = AuthService.decodeToken(req.header('Authorization'));
    const item = {
        title: body.title,
        description: body.description
    };

    UserRepository.createItem(email, item, function (err, user) {
        if(err) {
            res.status(404).send(err);
            return;
        }
        // console.log(user)
        res.status(201).json({todolist:user.todolist});
    })
});

router.delete('/list/:id',auth,function (req, res) {
    const item_id = req.params.id;
    const email = AuthService.decodeToken(req.header('Authorization'));
    UserRepository.deleteItem(email,item_id, function (err,user) {
        if(err) {
            res.status(404).send(err);
            return;
        }
        // console.log(user)
        res.status(200).send(user);
    })
})

module.exports = router;