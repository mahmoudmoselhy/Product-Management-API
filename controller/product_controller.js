const Product = require("../models/Proudct_model")



const getAllProducts = async (req,res ,next)=>{

    try{

        const products = await Product.find();
        if(products.length == 0){
            return res.status(404).json({message:"no product found"});
            }

            res.status(200).json({message:"all products",products});
        
    }

    catch(err){
        next(err);
    }
};


const getProductById = async (req , res ,next)=>{
    try{
        const productId = req.params.id;

        const product = await Product.findById(productId);

        if(!product){

            return res.status(404).json({message:"product not found"})
        }

        res.status(200).json({message:"all product",product})
    }
    catch(err){
        next(err);
    }
};


const getProductBySlug = async (req , res ,next)=>{
    try{
        const productSlug = req.params.slug;

        const product = await Product.findOne({slug: productSlug});

        if(!product){

            return res.status(404).json({message:"product not found"})
        }

        res.status(200).json({message:"all product",product})
    }
    catch(err){
        next(err);
    }
};


const createProduct = async (req , res ,next)=>{
    try{
        const {name , description , price , category , slug ,discount , isActive,stock}  = req.body;
        
        const existProduct = await Product.findOne({slug}) ;
        const existProductS = await Product.findOne({name}) ;
        if(existProduct || existProductS){
            return res.status(400).json({message:"product already exist"}) ; 
        }
        const product = await new Product({name , description , price , category , slug ,discount , isActive,stock});
        
        
        product.save();

        res.status(201).json({message:"product created",product})
    }
    catch(err){
        next(err);
    }
};


const updateProduct = async (req , res ,next)=>{
    try{
        const productId = req.params.id;
        const {name , description , price , category , slug ,discount , isActive,stock}  = req.body;
        
        const product = await Product.findByIdAndUpdate(productId,{name , description , price , category , slug ,discount , isActive,stock},{ new: true });
        if (!product){ 
            return res.status(404).json({message:"product not found"});
        }
        res.status(200).json({message:"product updated", product});
    }
    catch(err){
        next(err);
    }
};


const deleteProduct = async (req , res ,next)=>{
    try{
        const productId = req.params.id;
        const product = await Product.findByIdAndDelete(productId);
        if(!product){
            return res.status(404).json({message:"product not found"});
        }

        res.status(200).json({message:"product deleted"})
    }
    catch(err){
        next(err);
    }
};


const uploadProductImage = async (req , res ,next)=>{
    try{
        const productId = req.params.id;
        const product = await Product.findById(productId)
        const img = req.file;

        if(!product){
            return res.status(404).json({message:"product not found"})
        }
        if (!img){
            return res.status(400).json({message:"file not uploaded"})
        }
        product.mainImage = req.file.path;
        await product.save()
        res.status(200).json({message:"image uploaded"})

    }
    catch(err){
        next(err);
    }
};







module.exports ={getAllProducts, getProductById,createProduct,updateProduct,deleteProduct,getProductBySlug,uploadProductImage}