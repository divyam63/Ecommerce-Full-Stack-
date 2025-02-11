import express from "express";
import { getAllProducts,createProduct, updateProduct, deleteProduct, getProductDetail } from "../controllers/productController.js";
import { authorisedRole, isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

// Express automatically appends 
// the route paths (/product, /product/new, etc.)
//  to base url  "http://localhost:5000/api".

router.route("/product").get(getAllProducts);  // if person get loginned 
// then get only get all 

router.route("/product/new").post(isAuthenticatedUser,createProduct);

router.route("/product/:id").put(isAuthenticatedUser,authorisedRole("admin"),updateProduct)
.delete(isAuthenticatedUser,deleteProduct)
.get(getProductDetail);

export default router;


