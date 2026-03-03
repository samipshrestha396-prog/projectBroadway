import express from "express";
import userRouter from "./routes/user_route.js";
import cookieParser from "cookie-parser";
import product_route from "./routes/product_route.js";
import  order_route from "./routes/order_route.js";
import upload_route from "./routes/upload.route.js";





const app= express();

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth",userRouter);
app.use("/api/products",product_route);
app.use("/api/orders",order_route);
app.use("/api/upload",upload_route);



export default app;


