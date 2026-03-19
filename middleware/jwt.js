const jwt =require("jsonwebtoken")

 const CrateToken =(userid,name,role)=>{
    return jwt.sign({userid,name,role},
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRES_IN || "7d"}

    )
};

module.exports = CrateToken;