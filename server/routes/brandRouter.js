const Router = require("express");
const router = new Router();
const BrandController = require("../controllers/brandController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", BrandController.getAll);

router.post("/", authMiddleware, BrandController.create);

router.patch("/:id", authMiddleware, BrandController.edit);

router.delete("/:id", authMiddleware, BrandController.delete);

module.exports = router;
