const Router = require("express");
const router = new Router();
const PropertyController = require("../controllers/propertyController");

router.post("/", PropertyController.create);

router.get("/", PropertyController.getAll);

module.exports = router;
