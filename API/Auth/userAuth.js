const jwt = require('jsonwebtoken');

const userAuth = (req, res, next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token , process.env.jwtKey);
        req.userData = decoded;
        next();
    }
    catch(err){
        res.status(401).json({message: "Auth failed"});
    }
};

module.exports = {userAuth};