const express=require('express');
const router=express.Router();


const User=require('../../models/user');


//register form     /api/user/register
router.post('/register',async(req,res)=>{

    const {name ,email,password}=req.body;

    try {

    const user=await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:'upload/sample',
            url:'http://res.cloudinary.com/demo/image/upload/sample.jpg'
        }
    })

      const token=user.getJwtToken()

    res.status(201).json({
        success:true,
        token
    })
        

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }



})

//login /api/user/login
router.post('/login',async(req,res)=>{

    const {email,password}=req.body;

    //checks if email and password is entered by user
    if(!email || !password){
        return res.status(400).json({ errors : [{ msg: 'Please enter email & password'}]});
    }
    //find user in database
    const user=await  User.findOne({email}).select('+password')

    if(!user){
        return res.status(401).json({ errors : [{ msg: 'Invalid Email or Password'}]});
    }
    //check if password is correct or not
    const isPasswordMatched=await user.comparePassword(password);

    if(!isPasswordMatched){
        return res.status(401).json({ errors : [{ msg: 'Invalid Email & Password'}]});
    }

    const token=user.getJwtToken();

    res.status(200).json({
        success:true,
        token
    })

})


module.exports=router;