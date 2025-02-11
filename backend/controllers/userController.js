
import asyncHandler from "../utils/asyncHandler.js";

import User from "../models/userModel.js";

export const registerUser = asyncHandler(async (req,res,next)=>{
    const {name,email,password}= req.body;

    const user = await User.create({ name, email, password ,avatar:{
        public_id: "this is sample id",
        url: "sample_url"
    }});

    const token = user.getJWTToken();

    res.status(201).json({
        success: true,
        token,
        
    });
})

//LOGIN USER

export const loginUser=asyncHandler(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return next(new Error("Please enter email and password"));
    }

    const user =await User.findOne({email}).select("+password");  //password false hai

    if(!user){
        return next(new Error("invalid email or password"));

    }

    const isPasswordMatched =await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new Error("Invalid email or password"));
    }

    const token = user.getJWTToken();

    res.status(200).json({
        success: true,
        token
    });

})

//LOGOUT USER

export const logout= asyncHandler(async(req,res,next)=>{
    res.cookie("token",null,{
        expires : new Date (Date.now()),
        httpOnly :true,
    });

    res.status(200).json({
        succees: true,
        message:"logged out successfully",

    })
})
