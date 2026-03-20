const express = require("express")
const router = express.Router()
const productValidation = require("../middleware/validation/product_validation")
const checkAdmin = require("../middleware/permission")
const {auth} =require("../middleware/authMiddleware");
const upload = require ("../middleware/upload_multer")
const {getAllProducts , getProductById , getProductBySlug , createProduct , updateProduct , deleteProduct,uploadProductImage} = require("../controller/product_controller")


router.get("/" ,getAllProducts)
router.get("/:id" ,getProductById)
router.get("/slug/:slug" ,getProductBySlug)
router.post("/create-product" ,auth,checkAdmin,productValidation,createProduct)
router.put("/update-product/:id" ,auth,checkAdmin,productValidation,updateProduct)
router.delete("/delete-product/:id" ,auth,checkAdmin,productValidation,deleteProduct)
router.post("/upload-img/:id" ,auth,checkAdmin,productValidation,upload("products").single("mainImage"),uploadProductImage)



module.exports = router