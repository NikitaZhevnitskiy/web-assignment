const mongoose = require('mongoose');
// const host = process.env.DOCKER_DB || "localhost"
const mongoURI = require('../config/keys').mongoURI;
// console.log(mongoURI);
mongoose.connect(mongoURI);
const User = require('../models/user')
    , ObjectID = require('mongodb').ObjectID;

exports.getAll = function({}, cb) {
    User.find((err, users) => {
        // console.log(users);
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
        // console.log(user)
        if (err) cb(err);
        cb(null,user);
    })
};

exports.getList = function(email, cb){
    User.findOne({'email':email}, (err, user) => {
        if (err) cb(err);
        if (user && user.todolist) cb(null,user.todolist);
        if (err) cb(err);
    })
};

exports.createItem=function (email, item, cb) {
    console.log(email);
    console.log(item);

    User.findOne({'email':email}, (err, user) =>{
        console.log(user)
        if(err) cb(err)
        user.todolist.push(item)
        user.save((err,u)=>{
            if(err)cb(err)
            cb(null,u)
        })
    })
};

exports.deleteItem=function (email, item_id, cb) {
    var id = new ObjectID(item_id);
    console.log(id);
    User.update({"email":email}, { $pull:{"todolist":{"_id":new ObjectID(item_id)}}}, function(err, data) {
        if(err) cb(err)
        cb(null,data)
    })
};

// Test purpose
exports.cleanTable=function (cb) {
    User.remove({},function (err) {
        if(err){
            console.log(err)
        } else {
            cb("cleaned")
        }
    })
};

exports.disconnect=function (done) {
    mongoose.disconnect(done)
};