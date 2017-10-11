const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test');
const User = require('../models/user')
    , ObjectID = require('mongodb').ObjectID
    , jwtSimple = require('jwt-simple') //TODO: move authentication
    , bcrypt = require('bcryptjs')

hash = function(password) {
    return bcrypt.hashSync(password, 10);
};

exports.getAll = function({}, cb) {
    User.find((err, users) => {
        if (err) cb(err);
        cb(null,users);
    })
};

exports.registerUser=function(username, password, cb) {
    var user = {
        username: username,
        password: hash(password),
    };
    const u = new User(user);
    u.save((err,entity)=>{
        //TODO: change err message
        if(err)return cb(err.message);
        cb(null,entity);
    });
};