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
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,'Pease select category for this produts'],
        enum:{
            values:[
                'Electronics',
                'Cameras',
                'Laptop',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/Health',
                'Sports',
                'Outdoor',
                'Home'

        ],
        message:'Please select correct category for product'

        }
    },
    seller:{
        type:String,
        required:[true,'please enter product seller']
    },
    stock:{
        type:Number,
        required:[true,'Please enter product stock'],
        maxLength:[5,'Product name cannot exced 5 characters '],
        default:0

    },
    numOfReviews:{
        type:Number,
        default:0
    }


})

module.exports=mongoose.model('Product',productSchema);