var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true}
});

module.exports = mongoose.model('User', UserSchema);


// const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost/test')
// const User = mongoose.model('User', {
//     username: { type: String, unique : true, required: true },
//     password: { type: String, required: true },
// });
// const ObjectID = require('mongodb').ObjectID
// var jwtSimple = require('jwt-simple') //TODO: move authentication
//     , bcrypt = require('bcryptjs')
//
//
// hash = function(password) {
//     return bcrypt.hashSync(password, 10);
// };
//
// exports.create = function(username, password, cb) {
//     var user = {
//         username: username,
//         password: hash(password),
//     };
//     const u = new User(user)
//     // console.log(u);
//     u.save((err,entity)=>{
//         if(err)return cb(err.message);
//         cb(null,entity);
//     });
// };
//
// exports.get = function({}, cb) {
//     User.find((err, users) => {
//         if (err) cb(err);
//         cb(null,users);
//     })
// };