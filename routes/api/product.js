const express=require('express');
const router=express.Router();


const Product=require('../../models/product');

const SearchKeyword=require('../../utils/searchKeyword');



//get the all products /api/products
router.get('/', async (req,res)=>{

    const searchkeyword= new SearchKeyword(Product.find(),req.query).search().filter()

    const products=await searchkeyword.query;
    try {
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
//update product /api/product/list/:id
router.put('/list/:id',async(req,res)=>{

    let product=await Product.findById(req.params.id);

    try {

        if(!product){
            return res.status(404).json({
                success:false,
                message:'Product not found'
            })
        }

        product=await Product.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
            useFindAndModify:false

        });
    
        res.status(200).json({
            success:true,
            product
        })

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }

})
//Delete product   /api/product/list/delete/:id
router.delete('/list/delete/:id',async(req,res)=>{

    const product=await Product.findById(req.params.id);

    try {

        if(!product){
            return res.status(404).json({
                success:false,
                message:'Product not found'
            })
        }

      await product.remove();
    
        res.status(200).json({
            success:true,
            message:'product is deleted'
        })

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }

})






module.exports=router;

