import express from "express";
import { getAllProducts,createProduct, updateProduct, deleteProduct, getProductDetail } from "../controllers/productController.js";

const router = express.Router();

// Express automatically appends 
// the route paths (/product, /product/new, etc.)
//  to base url  "http://localhost:5000/api".

router.route("/product").get(getAllProducts);

router.route("/product/new").post(createProduct);

router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductDetail);

export default router;


