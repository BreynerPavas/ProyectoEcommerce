const express = require("express")
const ProductController = require("../controllers/ProductController")
const router = express.Router();

router.post("/create",ProductController.create);
router.put("/update/id/:id",ProductController.update);
router.delete("/delete/id/:id",ProductController.delete);
router.get("/",ProductController.getAll);
router.get("/id/:id",ProductController.getById);
router.get("/name/:name",ProductController.getByName);
router.get("/priceAbove/:price",ProductController.getByPriceAbove);
router.get("/priceBelow/:price",ProductController.getByPriceBelow);
router.get("/priceHigherToLower",ProductController.getByPriceHigherToLower);

module.exports = router;