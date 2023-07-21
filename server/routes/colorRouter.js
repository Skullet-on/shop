const Router = require("express");
const router = new Router();
const ColorController = require("../controllers/colorController");
const authMiddleware = require("../middleware/authMiddleware");
const { body } = require("express-validator");

router.get("/", ColorController.getAll);

router.post("/", authMiddleware, ColorController.create);

router.delete("/:id", authMiddleware, ColorController.delete);

router.patch("/:id", authMiddleware, ColorController.edit);

module.exports = router;
