var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    public:{type:Boolean, default:false}
});

var UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {type: String, required: true},
    todolist:[ItemSchema]}
);



module.exports = mongoose.model('User', UserSchema);