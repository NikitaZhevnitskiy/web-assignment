const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test');
const User = require('../models/user')
    , ObjectID = require('mongodb').ObjectID
    , jwtSimple = require('jwt-simple') //TODO: move authentication
    , bcrypt = require('bcryptjs')

// exports.hash = function(password) {
//     return bcrypt.hashSync(password, 10);
// };

exports.getAll = function({}, cb) {
    User.find((err, users) => {
        if (err) cb(err);
        cb(null,users);
    })
};

exports.registerUser=function(email, hashedPassword, cb) {
    var user = {
        email: email,
        password: hashedPassword,
        todolist: []
    };
    const u = new User(user);
    u.save((err,entity)=>{
        //TODO: change err message
        if(err)return cb(err.message);
        cb(null,entity);
    });
};

exports.getUserByEmail = function(email, cb){
    User.findOne({'email':email}, (err, user) => {
        console.log(user)
        if (err) cb(err);
        cb(null,user);
    })
};