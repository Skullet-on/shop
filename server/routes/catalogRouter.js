const Router = require("express");
const router = new Router();
const CatalogController = require("../controllers/catalogController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", CatalogController.getAll);

router.post("/", authMiddleware, CatalogController.create);

router.patch("/:id", authMiddleware, CatalogController.edit);

module.exports = router;
