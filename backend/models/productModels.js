import mongoose from "mongoose"

const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter THe name"],
        default: "Product Name"
    },
    description:{
        type:String,
        required:[true,"Please Enter product description"]
    },
    price:{
        type:Number,
        required:[true,"Please Enter price"],
        maxLength:[8,"length greter than 8"],
        default: 100
    },
    rating:{
        type : Number,
        default :0

    },
    image:[{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }

    ],

    category:{
        type:String,
        required:[true,"enter catogory"]
    },
    stock:{
        type:Number,
        required:[true,"stock"],
        maxLength:[4,"not exeed 4"],
        default :1
    },
    numOfRevies:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true,

            },
            rating:{
                type:String,
                required:true,
                
            },
            comment:{
                type:String,
                required:true,
                
            }
        }
    ],

    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },

    createdAt:{
        type:Date,
        default:Date.now
    }


})

export default mongoose.model("Product", productSchema);