const express = require("express")
const router = express.Router()
const {auth} =require("../middleware/authMiddleware");
const checkAdmin = require("../middleware/permission")
const categoryValidation = require("../middleware/validation/category_validation")
const upload = require ("../middleware/upload_multer")

const {getAllCategories , getCategoryById , getCategoryBySlug , createCategory , updateCategory , deleteCategory,uploadImg} = require("../controller/category_controller")

router.get("/" ,getAllCategories)
router.get("/:id" ,getCategoryById)
router.get("/slug/:slug" ,getCategoryBySlug)
router.post("/create-category" ,auth,checkAdmin,categoryValidation,createCategory)
router.put("/update/:id" ,auth,checkAdmin,categoryValidation,updateCategory)
router.delete("/delete/:id" ,auth,checkAdmin,categoryValidation,deleteCategory)
router.post("/:id/upload-image",auth,checkAdmin,categoryValidation,upload("categories").single("image"),uploadImg)



module.exports = router