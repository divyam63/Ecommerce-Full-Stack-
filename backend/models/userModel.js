import mongoose from "mongoose";
import validator from "validator"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        trim: true,
        maxLength:[30,"not more than 30 char"],
        minlength:[4,">=4 char in name"]
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [8,"password shoud be >=8"],
        select: false   //jab include karo +password karo
    },
    // passwordConfirm: {
    //     type: String,
    //     required: [true, 'Please confirm your password'],
    //     validate: {
    //         validator: function(el) {
    //             return el === this.password;
    //         },
    //         message: 'Passwords are not the same!'
    //     }
    // },
    avatar: {
        public_id:{
            type: String ,
            required: true,
        },
        url :{
            type:String,
            required:true,
        }
       
    },

    role:{
        type: String,
        default: "user",
    },

    resetPasswordToken:String,
    resetPasswordExpire:Date,

    createdAt: {
        type: Date,
        default: Date.now
    }
});

//user schema save se pahle pass-> encrypt kar de

userSchema.pre("save",async function (next) {
    //this can't be use in arrow fn
    if(!this.isModified("password")){
        next();
    }
    this.password =await  bcrypt.hash(this.password,10); //number show how strong pass is
})

//JWT TOKEN
userSchema.methods.getJWTToken=function (params) {
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}

// Compare user password
// userSchema.methods.comparePassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password); //this->hashed password
// }
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


export default mongoose.model('User', userSchema);