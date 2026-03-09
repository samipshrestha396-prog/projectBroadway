import User from "../model/User.js";
import generate_token from "../utils/generate_token.js";


const register= async(req, res)=>{
    const {name,surename,password,gmail,is_admin}=req.body;
    const user= await User.findOne({gmail});
    if (user){
        return res.status(404).send({error:"User already exists"});
    }

const registered_user= await User.create( {name,surename,password,gmail,is_admin});
res.status(201).send({message:"User created successfully!"});
 
};


const login =async (req, res)=>{
const {gmail,password}=req.body;
const user=await User.findOne({gmail});
if(!user){
    return res.status(404).send({error:"user not found"})
    
}
const is_match= await user.compare_password(password);
    if(!is_match){
        return res.status(401).send({error:"incorrect password"});
    };
    const token= generate_token(user._id,res) 
    res.send({message:"logged in successfully!", token,
        user:{
        name: user.name,
        surename: user.surename,
        is_admin: user.is_admin
    }


    });


};
 
const logout = ( req, res)=>{
    res.clearCookie("jwt");
    res.send({message:"logout success"});
};


const profile =  ( req , res)=>{
    const user = req.user;
    res.status(200).send({message:"profile details",user})
};


const update_profile= async( req , res)=>{
    const {name,surename,gmail,password}= req.body;
    const userId = req.user._id;
    const user= await User.findById(userId)
   
    if(!user) return res.status(404).send({error:"user not found hahha"})

        user.name = name || user.name;
        user.surename = surename || user.surename;
        user.gmail = gmail || user.gmail
        if(password) user.password = password;
        await user.save();
        res.status(200).send({message:"user updated successfully"})

}

export {register,login,logout,profile,update_profile};



