const express=require('express');
const connectDB=require('./config/db');
const path=require('path');

const app=express();

//Connect Database
connectDB();


// Init Middleware
app.use(express.json({extended: false}));

//Define Routes

const products=require('./routes/product');
app.use('/api/v1',products);




const PORT=process.env.PORT || 4000;

app.listen(PORT,()=>console.log(`server started on port ${PORT}`));