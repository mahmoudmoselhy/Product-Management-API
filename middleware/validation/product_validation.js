const joi = require("joi")


const productValidation =(req ,res ,next)=>{
    const schema = joi.object({
        name :joi.string().min(3).max(30).required(),   
        slug : joi.string(),
        description :joi.string().min(20).max(300),
        price : joi.number().positive().required(),
        discount : joi.number().min(0).max(100),
        satisfies : joi.array().items(joi.string()),
        category : joi.string().required(),
        isActive : joi.boolean(),
        stock : joi.number().integer().min(0).required(),
        finalPrice : joi.number().positive(),
        mainImage : joi.string().uri(),
        image: joi.array().items(joi.string().uri())
    })
    const {error} = schema.validate(req.body);
if(error){
    return res.status(400).json({error :error.message})
}
next();
};


module.exports = productValidation




