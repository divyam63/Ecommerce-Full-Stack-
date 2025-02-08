import express from "express";
import { getAllProducts,createProduct, updateProduct, deleteProduct, getProductDetail } from "../controllers/productController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

// Express automatically appends 
// the route paths (/product, /product/new, etc.)
//  to base url  "http://localhost:5000/api".

router.route("/product").get(isAuthenticatedUser, getAllProducts);  // if person get loginned 
// then get only get all 

router.route("/product/new").post(createProduct);

router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductDetail);

export default router;


