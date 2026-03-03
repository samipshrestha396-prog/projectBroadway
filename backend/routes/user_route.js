import express from "express";
import { login, logout, profile, register, update_profile } from "../controller/user_control.js";
import check_auth from "../middleware/check_auth.js";



const router=express.Router();
router.post("/register",register);
router.post("/login",login);
router.post("/logout",check_auth,logout);
router.get("/profile",check_auth,profile);
router.put("/update_profile",check_auth,update_profile);


export default router;




