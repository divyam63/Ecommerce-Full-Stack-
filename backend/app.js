import express from "express";
 
import errorMiddleware from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

//
app.use(cookieParser());

// Route imports
import product from "./routes/productRoute.js"; 
import user from "./routes/userRoute.js";
app.use("/api/v1", product);
app.use("/api/v1", user);

// Middleware for error
// The error middleware should be used after all routes and other middleware
//catch async error GLOBAL ERROR HANDLER
app.use(errorMiddleware);

export default app;