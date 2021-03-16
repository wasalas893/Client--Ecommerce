const express=require('express');
const connectDB=require('./config/db');
const path=require('path');

const app=express();

//Connect Database
connectDB();


// Init Middleware
app.use(express.json({extended: false}));

//Define Routes
app.use('/api/products',require('./routes/api/products'));


const PORT=process.env.PORT || 4000;

app.listen(PORT,()=>console.log(`server started on port ${PORT}`));