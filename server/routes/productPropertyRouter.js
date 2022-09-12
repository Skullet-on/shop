const Router = require("express");
const router = new Router();
const productPropertyController = require("../controllers/productPropertyController");

router.get("/:propertyId", productPropertyController.getAll);

module.exports = router;
