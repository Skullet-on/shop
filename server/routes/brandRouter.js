const Router = require("express");
const router = new Router();
const BrandController = require("../controllers/brandController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", BrandController.getAll);

router.post("/", authMiddleware, BrandController.create);

module.exports = router;
