

const Category = require("../models/Category_model")


const getAllCategories = async (req , res ,next)=>{

    try{
        const categories = await Category.find()

    if(categories.length == 0){
        return res.status(404).json({message:"no categories found"})
    }

    res.status(200).json({categories})
    }

    catch(err){
        next(err);
    }
};



const getCategoryById = async (req , res ,next)=>{
    try{

        const categoryId = req.params.id
        const category = await Category.findById(categoryId);
        if (!category){
            return res.status(404).json({message:"category not found"})
        }

    res.status(200).json({category})
    }

    catch(err){
        next(err);
    }
};



const getCategoryBySlug = async (req , res ,next)=>{

    try{

        const slug = req.params.slug;
        const category = await Category.findOne({slug})
        if (!category){
            return res.status(404).json({message:"category not found"})
        }
        res.status(200).json({category})

    }

    catch(err){
        next(err);
    }

};



const createCategory = async (req,res,next)=>{
    try{
        const {name , description , slug  , parentCategory , isActive} = req.body;
        checkExist = await Category.findOne({name});
        checkSlug = await Category.findOne({slug});
        if(checkExist || checkSlug){
            return res.status(400).json({message:" category name or slug alrady exist"})
        }
        const category = await new Category({name , description , slug  , parentCategory , isActive});
        category.save()

        res.status(201).json({message:"category created sucss",  category})

       
    }

    catch(err){
        next(err);
    }
};



const updateCategory = async (req,res,next)=>{


    try{
        const categoryId = req.params.id;
        const {name , description , slug , parentCategory , isActive} = req.body;

        const category = await Category.findByIdAndUpdate(categoryId, {name , description , slug ,  parentCategory , isActive}, {new:true})

        if (!category){
            return res.status(404).json({message:"categroy not found"})
        }
        if (category.name == category.parentCategory){
            return res.status(400).json({message:"category can't be the same parent"})
        }
        res.status(200).json({message:"category updated",category});

    }

    catch(err){

        next(err);
    }
};



const deleteCategory = async (req , res , next)=>{

    try{
        const categoryId = req.params.id
        const category = await Category.findByIdAndDelete(categoryId)
        if (!category){
            return res.status(404).json({message:"category not found"})
        }
        res.status(200).json({message:"category deleted sucss", category})

    }

    catch(err){
        next(err);
    }

};



const uploadImg = async (req , res , next)=>{

    try{
        const categoryId = req.params.id;
        const category = await Category.findById(categoryId);
        if(!category){
            return res.status(404).json({message:"categoy not found"})
        }
        if (!req.file){
           return res.status(400).json({message:"no file uploaded"})
        }
        category.image = req.file.path;
        await category.save()

        res.status(200).json({message:"image uploaded sucss",category})

    }

    catch(err){
        next(err);
    }
};




module.exports = {getAllCategories , getCategoryById , getCategoryBySlug , createCategory , updateCategory , deleteCategory, uploadImg}