const Router = require("express");
const router = new Router();
const catalogPropertyController = require("../controllers/catalogPropertyController");
const authMiddleware = require("../middleware/authMiddleware");

router.delete("/", authMiddleware, catalogPropertyController.removeProperty);

module.exports = router;
