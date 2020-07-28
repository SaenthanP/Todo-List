const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const todoSchema=new Schema({
    taskName:{
        type:String,
        required:true,
        unique:true,
        trim:true,
     
    },
    userId:{
        type:String,
        required:true,
        trim:true,
        minlength:8
    },
});
const Todo=mongoose.model('Todo',todoSchema);
module.exports=Todo;