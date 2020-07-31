const express=require('express');
const cors =require('cors');
const mongoose=require('mongoose');
const bodyParser = require('body-parser');


//Environment variables
require('dotenv').config();

//Creates express server
const app=express();
const port=process.env.PORT || 5000;

//Cors middleware
app.use(cors());
//parses json
app.use(express.json());
app.use(bodyParser.json());
//Setting up db
const uri=process.env.ATLAS_URI;

mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true});
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB database connection established successfully");
    
});
//Setup user routs
const usersRouter=require('./routes/users');
app.use('/users',usersRouter);

const todoRouter=require('./routes/todo');
app.use('/todo',todoRouter);


app.listen(port,()=>{
    console.log('Server is running on port: '+port);
});