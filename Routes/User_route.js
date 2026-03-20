const express = require("express")
const router = express.Router()
const authMiddleware =require("../middleware/authMiddleware");
const {registerUser , loginUser } = require("../controller/user_controller");
const {registerValidation , loginValidation} = require("../middleware/validation/user_validation")


router.post("/register", registerValidation,registerUser)
router.post("/login" , loginValidation, loginUser)






module.exports= router