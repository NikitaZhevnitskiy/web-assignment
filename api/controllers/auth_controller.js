var express = require('express')
    , router = express.Router()
    , Validator = require('../helpers/validator')
    , UserRepository = require('../repositories/user_repo')
    , AuthService = require('../services/auth_service');

router.post('/login', function(req, res) {
    const userBody = req.body;
    const emailInput = userBody.email+"";
    const passwordInput = userBody.password+"";

    if (Validator.isValid(emailInput) && Validator.isValid(passwordInput)){
            // 1. finn brukeren by brukernavn
            UserRepository.getUserByEmail(emailInput, function (err, user) {

                if(err) {
                    res.status(500).send(err);
                    return;
                }

                if(!user){
                    res.status(500).send('user not found');
                    return;
                }

                // 2. sammenlikn passord
                if(AuthService.compareHashes(passwordInput, user.password)){
                    // 4. hvis rett: lag token
                    const token = AuthService.generateToken(user.email);
                    res.status(200).send(token);
                } else {

                    // 3. hvis feil: 401 Unauthorized
                    res.status(401).send('wrong password')
                }
            });
    } else {
        res.status(400).send('Check input fields. Email and password')
    }

});
router.get('/me', function (req, res) {

    const token = req.header('Authorization');
    // No token
    if(!token){res.status(401).send('Anauthorized: No token'); return;}

    const email = AuthService.decodeToken(token);
    // Bad token
    if(!email){res.status(401).send('Anauthorized: BAD token'); return;}

    // All OK
    res.status(200).send(email);
});


module.exports = router;