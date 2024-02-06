const UserModel = require('../models/user')
const jwt = require('jsonwebtoken');
const createToken = (_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'})
}
const login = async (req,res)=>{
    const {email,password} = req.body

    try{
        const user = await UserModel.login(email,password)
        //creer token
        const token = createToken(user._id)
        res.status(200).json({email,token})
    }catch(err){
        res.status(400).json({error:err.message})
    }
}
const signUpUser = async (req,res)=>{
    const {email,password} = req.body

    try{
        const user = await UserModel.signup(email,password)
        //creer token
        const token = createToken(user._id)
        res.status(200).json({email,token})
    }catch(err){
        res.status(400).json({error:err.message , message:"dhohsd"})
    }

}

module.exports = {login,signUpUser}