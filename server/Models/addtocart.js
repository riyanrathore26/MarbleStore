const mongoose= require('mongoose');
const {Schema}=mongoose;

const UserinfoSchema=new mongoose.Schema({
    product_id:{type:String,required:true},
    user_email:{type:String,required:true},
})

const addtocart=mongoose.model('addtocart',UserinfoSchema);
module.exports = addtocart;
