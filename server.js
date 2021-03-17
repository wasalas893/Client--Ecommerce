const express=require('express');
const connectDB=require('./config/db');
const path=require('path');

const app=express();

//Connect Database
connectDB();


// Init Middleware
app.use(express.json({extended: false}));


//Define Routes
app.use('/api/product',require('./routes/api/product'));
app.use('/api/user',require('./routes/api/user'));





const PORT=process.env.PORT || 4000;

app.listen(PORT,()=>console.log(`server started on port ${PORT}`));