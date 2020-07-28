const router = require('express').Router();
let User = require('../models/user.model');
let Todo = require('../models/todo.model');

const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const auth=require('../middleware/auth');

router.route('/').get(auth,async(req, res) => {
   const user =await User.findById(req.user);
   res.json({username:user.username,id:user._id});

});


router.route('/create').post(auth,async(req, res) => {
    try{
    let { taskName } = req.body;

    if (!taskName) {
        return res.status(400).json({Error : "Task not entered"});
    }
    
    const isTaken=await Todo.findOne({taskName:taskName});
    if(isTaken){
        return res.status(400).json({Error:"Task already exists"});

    }
  
 
    const newTask=new Todo({
      taskName,
      userId:req.user,
    });
    
    newTask.save()
    .then(()=>res.json('Task added!'))
    .catch(err=>res.status(400).json({Error: err}));

}catch(err){
    res.status(500).json({Error :err});
}

});


router.route('/delete').delete(auth,async(req,res)=>{
    try{
        const deletedUser=req.user;
       User.findByIdAndDelete(deletedUser)
        .then(()=>res.json("deleted"))
        .catch(err=>res.status(400).json('Error: '+err));
    }catch(err){
        res.status(500).json('Error'+err); 
    }

});
router.route('/tokenIsValid').post(async(req,res)=>{
    try{
        const token=req.header("x-auth-token");
        if(!token){
            return res.json(false);
        }
            const verified=jwt.verify(token,process.env.SECRET);
        if(!verified){
            return res.json(false);
        }
        const user= await User.findById(verified.id);
        if(!user){
            return res.json(false);
        }

        return res.json(true);
    }catch(err){
        res.status(500).json('Error'+err); 
    }

});

module.exports = router;