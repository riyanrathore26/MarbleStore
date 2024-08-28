const mongoose= require('mongoose');
const {Schema}=mongoose;

const UserinfoSchema=new mongoose.Schema({
    firstname:{type:String,required:false},
    lastname: {type:String,required:false},
    age: {type:String,required:false},
    gender: {type:String,required:false, default:'male'},
    email: {type:String,required:false},
    password: {type:String,required:false},
    contact: {type:String,required:false},
    role: { type: String, default: 'user' }, // Default role is user
})

const Userinfo=mongoose.model('User',UserinfoSchema);
module.exports = Userinfo;
