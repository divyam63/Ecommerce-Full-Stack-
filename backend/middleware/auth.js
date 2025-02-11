import User from "../models/userModel.js";
import asyncHandler from "../utils/asyncHandler.js"


export const isAuthenticatedUser = asyncHandler(async(req,res,next) => {
    const token =req.cookie;
    console.log(token);  //

    if(!token){
        return next(new Error("Please login to get product all product",401));
    }

    const decodedData =JsonWebTokenError.verify(token,process.env.JWT_SECRET);

    req.user = await User.findById (decodedData.id);

    next();
})

export const authorisedRole= (...roles)=>{
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {  // for array of words which u allow
            //we store in usermodel////
            return next(new Error(`Role (${req.user.role}) is not allowed to access this resource`, 403));
        }
        next();  // sign to pass next
    }
}