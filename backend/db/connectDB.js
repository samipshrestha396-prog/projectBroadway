import mongoose from "mongoose";

 async function connectDB(){
    try{
        const conn =await mongoose.connect(process.env.MONGODB_URI)
        console.log("database connected successfully at:", conn.connection.host)
    }
    catch(err){
        console.log(" database connecting failed",err.message);
        process.exit();
    }

};
export default connectDB;





