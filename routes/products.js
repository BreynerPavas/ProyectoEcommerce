const express = require("express")
const ProductController = require("../controllers/ProductController")
const router = express.Router();
const { authentication, isAdmin } = require("../middleware/authentication")

router.post("/create",authentication,isAdmin,ProductController.create);
router.put("/update/id/:id",authentication,isAdmin,ProductController.update);
router.delete("/delete/id/:id",authentication,isAdmin,ProductController.delete);
router.get("/",ProductController.getAll);
router.get("/id/:id",ProductController.getById);
router.get("/name/:name",ProductController.getByName);
router.get("/priceAbove/:price",ProductController.getByPriceAbove);
router.get("/priceBelow/:price",ProductController.getByPriceBelow);
router.get("/priceHigherToLower",ProductController.getByPriceHigherToLower);
router.get("/getWithIdCategories/id/:id",ProductController.getWithIdCategories);
router.get("/getCategoriesAndReviews",ProductController.getCategoriesAndReviews);
router.get("/getByIdCategoriesAndReviews/id/:id",ProductController.getByIdCategoriesAndReviews);



module.exports = router;