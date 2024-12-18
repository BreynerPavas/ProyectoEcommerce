const express = require("express")
const OrderController = require("../controllers/OrderController")
const router = express.Router();
const { authentication, isAdmin } = require("../middleware/authentication")

router.post("/create",OrderController.create);
router.get("/",OrderController.getAll);
router.get("/getProducts/id/:id",OrderController.getByIdProducts);
router.get("/getByUser_idProducts",authentication,OrderController.getByUser_idProducts);

module.exports = router;