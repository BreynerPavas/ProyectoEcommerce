const express = require("express")
const ReviewController = require("../controllers/ReviewController")
const router = express.Router();

router.get("/",ReviewController.getAll);
router.post("/create",ReviewController.create);
router.get("/getWithUser",ReviewController.getAll_User)

module.exports = router;