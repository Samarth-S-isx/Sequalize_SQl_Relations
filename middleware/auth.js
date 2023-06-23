const jwt = require('jsonwebtoken')
const db = require('../models/connection')
const User = db.user


const isAuthentiated = async(req,res,next)=>{
    
    try{
        const token = req.headers.authorization.split(' ')[1]
        console.log(token)
        if(!token){
            const error = Error('Login First to get the link');error.code=401;return next(error)
        }
        const decoded = jwt.verify(token,'DEDEJIDSDSFEFDSC84511812CDC');
        req.number = {mobile_number:decoded.id}
        next();
    }catch(e){
        const error = Error('Login First to access the link');error.code=401;return next(error)
    }     
};


exports.isAuthentiated = isAuthentiated;