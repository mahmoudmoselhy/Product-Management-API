const joi = require("joi")



const categoryValidation =(req , res ,next)=>{
    const schema =joi.object({
        name :joi.string().min(3).max(30).required(),
        description: joi.string().min(20).max(300),
        slug :joi.string().min(3).max(30),
    })
}


module.exports = categoryValidation