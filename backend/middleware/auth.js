import User from "../models/userModel";
import asyncHandler from "../utils/asyncHandler"


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