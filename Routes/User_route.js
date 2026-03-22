const express = require("express")
const router = express.Router()
const authMiddleware =require("../middleware/authMiddleware");
const {registerUser , loginUser, myAccount ,editMyAccount } = require("../controller/user_controller");
const {registerValidation , loginValidation } = require("../middleware/validation/user_validation")
const {auth} =require("../middleware/authMiddleware");

router.post("/register", registerValidation,registerUser)
router.post("/login" , loginValidation, loginUser)
router.get("/me",auth , myAccount)
router.put("/editme",auth,editMyAccount)






module.exports= router