import express from "express";
import { forgotPassword, getUserDetails, loginUser, logout, registerUser ,resetPassword} from "../controllers/userController.js";
import { authorisedRole, isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logout);

router.route("/forgotPassword").post(forgotPassword);

router.route("/resetPassword/:token").put(resetPassword);

router.route("/me").get(isAuthenticatedUser,getUserDetails);
export default router;