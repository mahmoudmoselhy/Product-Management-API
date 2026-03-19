const jwt = require("jsonwebtoken")
const User = require("../models/User_model")


const auth= async (req , res , next)=>{


    try{

        const token = req.headers.authorization
        if(!token){
            return res.status(400).json({message:"no token provided"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findById(decoded.userid).select("-password")
        if(!user){
            return res.status(401).json({message:"user is not found"})
        }

        req.user= user
        next();



    }


    catch(error){
        // console.log(req.headers.token);
        return res.status(401).json({message:"invaild token",error: error.message})
    }


}


module.exports={auth}