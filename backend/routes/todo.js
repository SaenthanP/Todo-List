const router = require('express').Router();
let User = require('../models/user.model');
let Todo = require('../models/todo.model');

const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const auth=require('../middleware/auth');

router.route('/tasks').get(auth,async(req, res) => {
   const tasks =await Todo.find({userId:req.user});
   res.json(tasks);

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


router.route('/:id').delete(auth,async(req,res)=>{
    const taskToDelete=Todo.findOne({userId:req.user,_id:req.params.id});
if(!taskToDelete){
    return res.status(400).json({Error:"Task not found"});
}
const deletedTask=await Todo.findByIdAndDelete(req.params.id)
return res.json(deletedTask);

  

});


module.exports = router;