import jwt from "jsonwebtoken";
import User from "../model/User.js";

const check_auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).send({ error: "you are not logged in!" });
    }
    const { _id } = jwt.verify(token,process.env.JWT_SERCEAT_KEY);
    const user = await User.findById(_id);
  
    if(!user) return res.status(401).send({error:"user not found!!!"})
    req.user = {
      _id: user._id,
      name: user.name, 
      gmail: user.gmail,
      is_admin: user.is_admin,
    };
    next();

  } catch (err) {
     return res.send(err.message);
  }

};



export default  check_auth;



