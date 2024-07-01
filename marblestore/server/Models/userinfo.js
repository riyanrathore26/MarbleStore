const mongoose= require('mongoose');
const {Schema}=mongoose;

const UserinfoSchema=new mongoose.Schema({
    firstname:{type:String,required:true},
    lastname: {type:String,required:true},
    age: {type:String,required:true},
    gender: {type:String,required:true, default:'male'},
    email: {type:String,required:true},
    password: {type:String,required:true},
    contact: {type:String,required:true},
    role: { type: String, default: 'user' }, // Default role is user
})

const Userinfo=mongoose.model('User',UserinfoSchema);
module.exports = Userinfo;
