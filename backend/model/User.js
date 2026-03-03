import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const user_schema= new mongoose.Schema({
    name:{
        type:String,
        minlenght:3,
        maxlength:15,
        required:true,
    },

    surename:{
        type:String,
        required:true,
    },

    password:{
        required:true,
        type:String,
    },

    gmail:{
        type: String,
        required:true,
        unique:true,
    },
    is_admin:{
        type:Boolean,
        default:false,
    },
  
    
},
{timestamps:true}
);

//hashing the password
user_schema.pre("save",async function (next) {
    if(!this.isModified("password")){
        return;
    }
    const salt= await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);

});

// comparing the user entered password and hashed password
user_schema.methods.compare_password= async function (password){
    return await bcrypt.compare(password,this.password)
}

const User = mongoose.model("User",user_schema);

export default User;

















