const User =require("../models/User_model")
const bcrypt = require("bcrypt")
const createtoken= require("../middleware/jwt")


const registerUser = async (req , res)=>{
    try{

        const {name, email , password , confirmPassword} = req.body;

        if(password !== confirmPassword){
            return res.status(400).json({message:"your password and confirm password not match "});
        }
        const existUser = await User.findOne({email});
        if(existUser){
            res.status(400).json({message:"your email is alrady exist"});
        }


        const user = new User({name , email , password});
        await user.save();

        const token= createtoken(user._id , user.name , user.role);

        res.status(201).json({message:"user created sucessufly",
            user,token
        })

    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}






const loginUser = async (req , res)=>{

    try{

        const {email , password}= req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"your email is not found you need to registar"})
        }

        const chackPass = await bcrypt.compare(password, user.password);
        if(!chackPass){
           return res.status(400).json({message:"invalid pasword"})
        };

        const token = createtoken(user._id, user.name, user.role)
        res.json({message:"user login sucessufly",user , token});

    }

    catch(err){
        res.status(500).json({message:err.message})
    }
}






module.exports = { registerUser, loginUser };