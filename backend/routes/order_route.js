import express from "express";
import { add_order, delivered, get_my_orders, get_my_orders_by_id, pay_order, see_orders } from "../controller/order_control.js";
import check_auth from "../middleware/check_auth.js";
import check_admin from "../middleware/check_admin.js";

const router = express.Router();


router.post("/add",check_auth,add_order);
router.get("/get",check_auth,get_my_orders);
router.get("/see",check_auth,check_admin,see_orders);
router.get("/:id",check_auth,get_my_orders_by_id);
router.put("/:id/pay",check_auth,pay_order);
router.put("/:id/deliver",check_auth,check_admin,delivered);



export default router;