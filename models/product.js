const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter product name'],
        trim:true,
        maxLength:[100,'product name cannot exceed 100 characters'],
        
    },
    price:{
        type:Number,
        required:[true,'Please enter product price'],
        maxLength:[5,'product name cannot exceed 5 characters'],
        default:0.0

    },
    description:{
        type:String,
        required:[true,'Please enter product description'],
        
        
    },
    retings:{
        type:Number,
        default:0
    }


})

module.exports=mongoose.model('Product',productSchema);