const jwt = require('jsonwebtoken');

//next is the function to call when auth is complete; 401 means unauth
const auth = (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) {
            return res.status(401).json("Error " + "Authorization denied no token");
        }
        const verified=jwt.verify(token,process.env.SECRET);
        if(!verified){
            return res.status(401).json("Error " + "Authorization denied, token does not match");
        }
        req.user=verified.id;
        //this will call the function after auth
        next();
       
    } catch (err) {
        res.status(500).json('Error' + err);
    }
};
module.exports=auth;