const Category = require("../models/Category_model")


const getAllCategoryes = async (req , res ,next)=>{

    const categoryes = await Category.find()

    if(!categoryes){
        return res.status(404).json({message:"no categoryes found"})
    }

    res.json({categoryes})
}