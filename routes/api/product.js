const express=require('express');
const router=express.Router();


const Product=require('../../models/product');


//get the all products /api/products
router.get('/', async (req,res)=>{
    try {
        const products=await Product.find();
        res.json({
            success:true,
            count:products.length,
            products
        });

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//create the new products /api/products/new
router.post('/new',async(req,res)=>{

    try {
        const product =await Product.create(req.body);
        res.json({
            success:true,
            product
        });

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }


})

//get single post /api/product/:id
router.get('/:id',async(req,res)=>{
    const product=await Product.findById(req.params.id);

    try {
        const product=await Product.findById(req.params.id);

        if(!product){
            return res.status(404).json({
                success:false,
                message:'Product not found'
            })
        }
    
        res.status(200).json({
            success:true,
            product
        })

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }

})




module.exports=router;

