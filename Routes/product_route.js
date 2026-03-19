const express = require("express")
const router = express.Router()
const productValidation = require("../middleware/validation/product_validation")
const authMiddleware =require("../middleware/authMiddleware");




router.get("/" ,getAllProducts)
router.get("/:id" ,getProductById)
router.get("/:slug" ,getProductBySlug)
router.post("/" ,productValidation,authMiddleware.auth,createProduct)
router.put("/:id" ,productValidation,authMiddleware.auth,updateProduct)
router.delete("/:id" ,productValidation,authMiddleware.auth,deleteProduct)

