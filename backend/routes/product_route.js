import express from "express";

import check_admin from "../middleware/check_admin.js";
import check_auth from "../middleware/check_auth.js";
import {add_review, delete_products, get_product_by_id, get_products,post_products, put_product} from "../controller/product_control.js";


const router = express.Router();
 

router.get("/",get_products);
router.post("/",check_auth,check_admin,post_products);
router.get("/:id",get_product_by_id);
router.post("/:id/addreview",check_auth,add_review)
router.put("/:id",check_auth,check_admin,put_product);
router.delete("/:id",check_auth,check_admin,delete_products);




export default router;