const Router = require("express");
const router = new Router();
const productPropertiesController = require("../controllers/productPropertiesController");

router.get("/:propertyId", productPropertiesController.getAll);

module.exports = router;
