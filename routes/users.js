const express = require("express")
const UserController = require("../controllers/UserController")
const OrderController = require("../controllers/OrderController")
const { authentication, isAdmin } = require("../middleware/authentication")
const router = express.Router()

router.post("/create",UserController.create)
router.get("/getAll",UserController.getAll)
router.delete("/id/:id",authentication,isAdmin, UserController.delete)
router.put("/id/:id", UserController.update)
router.post("/login",UserController.login)
router.delete("/logout",authentication, UserController.logout)
router.get("/getOrdersProducts",authentication, OrderController.getByUser_idProducts)

module.exports = router