const User=require("../models/user")
const {StatusCodes}=require('http-status-codes')
const {BadRequestError, UnauthenticatedError}=require('../errors')




const register=async(req,res)=>{
    
 
    const user=await User.create({...req.body})
    const token=user.createJwt()
    
    res.status(StatusCodes.CREATED).json({name:user.name,status:user.status,picture:user.picture,newMessages:user.newMessages,token})
}
const login=async(req,res)=>{
   const{email,password}=req.body
   if(!email||!password){
    throw new BadRequestError("please provide a valid username address and password")
   }
  const user=await User.findOne({email})
  if(user){
    user.status = 'online';

  }
  
 
  if(!user){
    throw new UnauthenticatedError("Invalid Credentials")

  }
   
   const isPasswordCorrect=await user.comparePassword(password)
   if(!isPasswordCorrect){
    throw new UnauthenticatedError("Invalid Credentials")

  }
  const token=user.createJwt()
  
  res.status(StatusCodes.OK).json({name:user.name,status:user.status,picture:user.picture,newMessages:user.newMessages,token})
}



module.exports={register,login}