import userModel from "../models/userModel.js";
import catchAsyncError from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from 'jsonwebtoken';

const isAuthenticUser = catchAsyncError(async(req,res,next)=>{
    const {token} = req.cookies;
    
    if(!token){
        return next(new ErrorHandler("Please login to access this resources",401))
    }

    const decodedData = jwt.verify(token,process.env.JWT_SECRET)

    console.log(decodedData);

    req.user = await userModel.findById(decodedData.id)
    next();
})

const authRoles = (...roles)=>{

    return (req,res,next) =>{
        if(!roles.includes(req.user.role)){
            return next( new ErrorHandler(`Role: ${req.user.role} is not allowed to access this Resources`,403))
        }

    }
}

export default isAuthenticUser



