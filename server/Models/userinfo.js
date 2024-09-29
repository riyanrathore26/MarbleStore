const mongoose= require('mongoose');
const {Schema}=mongoose;

const UserinfoSchema=new mongoose.Schema({
    username: {type:String,require:false},
    age: {type:String,required:false},
    gender: {type:String,required:false},
    email: {type:String,required:false},
    password: {type:String,required:false},
    phonenumber: {type:String,required:false},
    profilepic:{type:String,required:false},
    role: { type: String, default: 'user' }, // Default role is user
})

const Userinfo=mongoose.model('User',UserinfoSchema);
module.exports = Userinfo;
