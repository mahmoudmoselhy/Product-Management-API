const express = require("express")
const router = express.Router()
const {auth} = require("../middleware/authMiddleware")
const {getAllUsers,createUser,updateUser,deleteUser} = require("../controller/admin_controller")
const checkAdmin = require("../middleware/permission")



router.use(auth , checkAdmin);






router.get("/users", getAllUsers)
router.post("/create-user", createUser)
router.put("/update-user/:id",updateUser)
router.delete("/delete-user/:id",deleteUser)



module.exports = router