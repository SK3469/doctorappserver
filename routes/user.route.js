import express from "express"
import {  getUserProfile, login, logout, register, updateProfile } from "../controllers/user.controller.js";
import { isAuthentication } from "../middleware/authentication.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile").get(isAuthentication ,getUserProfile);
router.route("/profile/update").post(isAuthentication,updateProfile)

export default router;