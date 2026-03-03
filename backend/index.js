import app from "./app.js";
import connectDB from "./db/connectDB.js";

connectDB().then(()=>{
    app.listen(9000, () => {
  console.log("server is running...");
});
});


