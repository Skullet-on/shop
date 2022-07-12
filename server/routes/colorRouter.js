const Router = require("express");
const router = new Router();
const ColorController = require("../controllers/colorController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", ColorController.getAll);

router.post("/", authMiddleware, ColorController.create);

module.exports = router;
