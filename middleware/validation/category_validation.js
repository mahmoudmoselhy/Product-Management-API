const joi = require("joi")



const categoryValidation =(req , res ,next)=>{
    const schema =joi.object({
        name :joi.string().min(3).max(30).required(),
        description: joi.string().min(20).max(300),
        slug :joi.string().min(3).max(30),
        image: joi.string(), 
        parentCategory: joi.string().hex().length(24).allow(null, ""),
        isActive: joi.boolean()
    })
    const {error} = schema.validate(req.body);
if(error){
    return res.status(400).json({error :error.message})
}
next();
};


module.exports = categoryValidation