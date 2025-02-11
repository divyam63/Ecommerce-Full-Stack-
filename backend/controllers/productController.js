
//cerate product
import Product from "../models/productModels.js";
import { ApiFeatures } from "../utils/apiFeatures.js";
import asyncHandler from "../utils/asyncHandler.js";


// Create product  -->only admin

export const createProduct = asyncHandler(async (req, res, next) => {
    req.body.user=req.user.id;  //user ka nam id ho jayega

    console.log("Request Body:", req.body); // Add this line
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
             product,
        });
   
});




export const  getAllProducts =asyncHandler(async (req,res)=>{
    const resultPerPage=5;
    const productCount = await Product.countDocuments();

    const apiFeatures=new ApiFeatures(Product.find(),req.query)
    .search()
    .filter()
    .pagination(resultPerPage)

        const products=await apiFeatures.query;
        //const products = await Product.find();
        res.status(200).json({
            success:true,
            products,
            productCount,
            message:"these are producs"
        })
})  

    


//update == > admin route;;

export const updateProduct= async (req,res,next)=>{

    // let product =await Product.findById(req.params.id);

    const productId =  req.params.id.trim(); // Trim any whitespace/newlines

    let product = await Product.findById(productId);

    if(!product){
        return res.status(500).json({
            success:false,
            message:"product  not found"
        })
    }

    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });

    res.status(200).json({
        success:true,
        message:"yes updated"
    })

}


//delet product

export const deleteProduct=async(req,res,next)=>{
    try {
        const product=await Product.findByIdAndDelete(req.params.id);

        //await product.remove();
        res.status(200).json({
            success:true,
            message: "deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            messages: [error.message,"product not found"]
        })
    }
}

//get product detail

export const getProductDetail=async(req,res,next)=>{
    try {
        const product=await Product.findById(req.params.id);

        //await product.remove();
        res.status(200).json({
            success:true,
            product
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            messages: [error.message,"product not found"]
        })
    }
}


//export default {getAllProducts}