const express=require('express');
const router=express.Router();


// @route GET api/auth
// @desc Test route
// @access public string
router.get('/', async (req,res)=>{
  
        res.status(200).json({
            success:true,
            message:"this router create"
        })
        
    
});

module.exports=router;