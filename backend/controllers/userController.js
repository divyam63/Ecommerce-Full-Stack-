
import asyncHandler from "../utils/asyncHandler.js";

import User from "../models/userModel.js";
import sendEmail from "../utils/sendEmail.js";


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

export const forgotPassword = asyncHandler(async (req, res, next) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return next(new Error("User not found with this email",404));
    }

    // Get reset token  by crypto do so.
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Create reset password URL
    const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;  //protocol -> http/https kya ho pata nhi.

    const message = `Your password reset token is as follows:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: "Password Recovery",
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email} successfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new Error(`"Email could not be sent" ${error}`,500));
    }
});


