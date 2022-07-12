const Router = require("express");
const router = new Router();
const ProductController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", ProductController.getAll);

router.post("/", authMiddleware, ProductController.create);

router.patch("/:id", authMiddleware, ProductController.edit);

router.delete("/:id", authMiddleware, ProductController.remove);

router.get("/:id", ProductController.getOne);

module.exports = router;
