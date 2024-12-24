import userModel from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import sendToken from "../utils/jwtToken.js";

// create user

const createUser = catchAsyncError(async(req,res,next) =>{

    const {name,password,email} = req.body
    
    const user = await userModel.create({
        name,password,email,avatar:{
            public_id:"user Id",
            url:"publicUrl"
        }
    })
    
    sendToken(user,201,res)

})

const loginUser = catchAsyncError(async(req,res,next) =>{
     const {email, password} = req.body;
     if(!email || !password){
        return next(new ErrorHandler("Email or Password Can't be blank",400))
     }
     const user = await userModel.findOne({email}).select("+password")
     if(!user){
        return next(new ErrorHandler("Invalid User or Password",401))
     }
     const isPasswordMatched = user.comparePassword(password);
     if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid User or Password",401))
     }
    
     sendToken(user,201,res)

}
)

const logOutUser = catchAsyncError(
    async(req,res,next)=>{
        res.cookie("token",null,{
            expires:new Date(Date.now()),
            httpOnly:true
        })

        res.status(201).json({
            success:true,
            message:"logged Out"
        })
    }
)

export  {createUser,loginUser,logOutUser}