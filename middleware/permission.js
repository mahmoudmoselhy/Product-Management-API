


const checkAdmin = (req , res , next)=>{

    try{

        if (req.user.role !=="admin"){

            return res.status(403).json({message:"you don't have permission"})
        }
        
        next();

    }

    catch(err){
        next(err);
    }
};





module.exports = checkAdmin ;