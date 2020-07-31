const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const auth=require('../middleware/auth');

router.route('/').get(auth,async(req, res) => {
   const user =await User.findById(req.user);
   res.json({username:user.username,id:user._id});

});


router.route('/register').post(async(req, res) => {
    try{
    let { username, password, confirmPassword } = req.body;

    if (!username || !password || !confirmPassword) {
        return res.status(400).json({Error : "Not all field entered"});
    }
    if (password.length < 8) {
        return res.status(400).json({Error : "password needs to be atleast 8 characters long"});

    }
    if (password !== confirmPassword) {
        return res.status(400).json({Error:  "password do not match"});

    }
    const isTaken=await User.findOne({username:username});
    if(isTaken){
        return res.status(400).json({Error:"Username is taken"});

    }
    const salt=await bcrypt.genSalt();
    const hashedPassword=await bcrypt.hash(password,salt);
 
    const newUser=new User({
        username,
        password:hashedPassword
    });
    
    newUser.save()
    .then(()=>res.json('User added!'))
    .catch(err=>res.status(400).json({Error: err}));

}catch(err){
    res.status(500).json({Error :err});
}

});
router.route('/login').post(async(req,res)=>{
    try{
        const {username,password}=req.body;
        //Validated credentials
        if(!username||!password){
            return res.status(400).json({Error : "Not all field entered"});
        }
        const loginUser=await User.findOne({username:username});
        if(!loginUser){
            return res.status(400).json({Error : "No user with this username"});
        }
        const isMatch=await bcrypt.compare(password,loginUser.password);
        if(!isMatch){
            return res.status(400).json({Error : "Invalid Credentials"});
        }
        const token=jwt.sign({id:loginUser._id},process.env.SECRET);
        
    
       //token is used to validate the user
        res.json({
            token,
            user:{
                id:loginUser._id,
                username:loginUser.username,
            },
        });
       
   }catch(err){
        res.status(500).json('Error'+err); 
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