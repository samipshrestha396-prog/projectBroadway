import jwt from "jsonwebtoken";
const generate_token= (_id,res)=>{
    const token= jwt.sign({_id},process.env.JWT_SERCEAT_KEY,{expiresIn:"5d"});
    res.cookie("jwt",token,{
        maxAge: 3*24*60*60*1000
    });

};
export default generate_token;