const joi = require("joi")


const productValidation =(req ,res ,next)=>{
    const schema = joi.object({
        name :joi.string().min(3).max(30).required(),   
        description :joi.string().min(20).max(300),
        price : joi.number().positive().required(),
        discount : joi.number().min(0).max(100),
        satisfies : joi.array().items(joi.string()),
        category : joi.string().required(),
    })
    const {error} = schema.validate(req.body);
if(error){
    return res.status(400).json({error :error.message})
}
next();
};


module.exports = productValidation




