
const User = require("../models/User_model")





const getAllUsers = async (req ,res ,next)=>{
    try{

        const users =await User.find();
        if(users.length == 0){
            return  res.status(404).json({message:"no users found"})
        }
        res.status(200).json({message:"all users",users});
    }

    catch(err){
        next(err);
    }
};


const createUser =  async (req , res , next)=>{

    try{

        const {name , email , password} = req.body
        if(!name || !email || !password){
            return res.status(400).json({message:"please writer  user information"})
        }
        const userExist = await User.findOne({email: email})
        if(userExist){
            return res.status(400).json({message:"user alrady exist"})
        }

        const user = await new User({name,email,password});
        user.save()
        res.status(201).json({message:"user created",user});

    }

    catch(err){
        next(err);
    }
};


const updateUser = async (req,res,next)=>{

    try{
        const userId = req.params.id
        const {name , email ,role} = req.body
        user = await User.findByIdAndUpdate(userId,{name,email,role},{new:true})
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        res.status(200).json({message:"user updated",user});

    }

    catch(err){
        next(err);
    }
};



const deleteUser = async (req , res , next)=>{
    try{
        const userId = req.params.id
        const user = await User.findByIdAndDelete(userId);
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        res.status(200).json({message:"user deleted",user})

        
    }
    catch(err){
        next(err);
    }
};



module.exports = { getAllUsers, createUser, updateUser, deleteUser};