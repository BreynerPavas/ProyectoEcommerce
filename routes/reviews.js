const express = require("express")
const ReviewController = require("../controllers/ReviewController")
const { authentication, isAdmin } = require("../middleware/authentication")
const router = express.Router();

router.get("/",ReviewController.getAll);
router.post("/create",authentication,ReviewController.create);
router.get("/getWithProduct",ReviewController.getAll_Product)
router.get("/getWithUser",ReviewController.getAll_User)

module.exports = router;