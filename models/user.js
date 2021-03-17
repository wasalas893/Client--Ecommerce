const mongoose=require('mongoose');
const validator=require('validator');
const config=require('config');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const JWT_SECRET=config.get('JWT_SECRET');
const JWT_EXPIRES_TIME=config.get('JWT_EXPIRES_TIME')



const userSchema=new mongoose.Schema({

    name:{
        type:String,
        required:[true,'please enter your name'],
        maxLength:[30,'your name cannot exceed 30 characters']
    },
    email:{
        type:String,
        required:[true,'please enter your email'],
        unique:true,
        validate:[validator.isEmail,'Please enter valid email address']
    },
    password:{
        type:String,
        required:[true,'please enter your password'],
        minlength:[6,'Your password must be longer than 6 characters'],
        select:false

    },
    avatar:{
        public_id:{
            type:String,
            required:true

        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:'user'
    },
    createAt:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date

})

//Encryption password hash
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password=await bcrypt.hash(this.password,10)
})

//compare user password
userSchema.methods.comparePassword= async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

//JWT webToken
userSchema.methods.getJwtToken=function(){
    return jwt.sign({id:this._id},JWT_SECRET,{
        expiresIn:JWT_EXPIRES_TIME

    });
}


module.exports=mongoose.model('User',userSchema);