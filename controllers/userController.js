const db = require('../models/connection')
const otpGenerator = require('otp-generator');
const User = db.user

const loginUser=async(req,res,next)=>{
    const {number} = req.body;
    let currentUser;
    try{
        currentUser = await User.findOne({ where: { mobile_number: number } });
    }catch(e){

    }
    if(!currentUser){
        const error = new Error("User does not exists go to localhost:3000/register");error.code=404;return next(error)
    }
    const otp = otpGenerator.generate(6, { alphabets:false, upperCase: false, specialChars: false,digits:true });

    try {
        currentUser.otp = otp;
        await currentUser.save();
    } catch (e) {

    }
    res.json({
        currentUser,
        message:"Go to localhost:3000/auth to check otp"
    });
}

const authUser =  async(req,res,next)=>{
    const {number,otp} = req.body;
    let currentUser;
    try{
        currentUser = await User.findOne({ where: { mobile_number: number } });
    }catch(e){

    }
    if(currentUser.otp!==otp){
        const error = new Error("Otp not correct");error.code=404;return next(error)
    }
    try{
        currentUser.otp=null;
        await currentUser.save();
    }catch(e){

    }
    const token = currentUser.getJwtToken()
    console.log(token)
    res.json({
        message:"Succesfully Logged In",
        token
    })
}

const registerUser = async(req,res,next)=>{
    const{name,number} = req.body;
    // console.log(req.body);
    let createdUser;
    try{
        createdUser = await User.create({mobile_number:number,name:name});
    }catch(e){
        const error = new Error(e);error.code=404;return next(error)
    }
    const otp = otpGenerator.generate(6, { alphabets:false, upperCase: false, specialChars: false,digits:true });

    try {
        createdUser.otp = otp;
        await createdUser.save();
    } catch (e) {

    }
    res.json({
        createdUser,
        message:"Go to localhost:3000/auth to check otp"
    })
}


const getUserById = async(req,res,next)=>{
    const id = req.params.id
    const user = await User.findByPk(id);
    res.json({
        user
    })
}

module.exports = {loginUser,registerUser,authUser,getUserById}