const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')
const User = mongoose.model('User', {
    username: { type: String, unique : true, required: true },
    password: { type: String, required: true },
});
const ObjectID = require('mongodb').ObjectID
var jwtSimple = require('jwt-simple') //TODO: move authentication
    , bcrypt = require('bcryptjs')


hash = function(password) {
    return bcrypt.hashSync(password, 10);
};

exports.create = function(username, password, cb) {
    var user = {
        username: username,
        password: hash(password),
    };
    const u = new User(user)
    // console.log(u);
    u.save((err,entity)=>{
        if(err)return cb(err.message);
        cb(null,entity);
    });
};



exports.get = function({}, cb) {
    User.find((err, users) => {
        if (err) cb(err)
        cb(null,users);
    })
}

// exports.authenticate = function(email, password) {
//     db.fetch({email:email}, function(err, docs) {
//         if (err) return cb(err)
//         if (docs.length === 0) return cb()
//
//         user = docs[0]
//
//         if (user.password === hash(password)) {
//             cb(null, docs[0])
//         } else {
//             cb()
//         }
//     })
// }

// exports.changePassword = function(id, password, cb) {
//     db.update({id:id}, {password: hash(password)}, function(err, affected) {
//         if (err) return cb(err)
//         cb(null, affected > 0)
//     })
// }