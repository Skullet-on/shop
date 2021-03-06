const Router = require("express");
const router = new Router();
const CatalogController = require("../controllers/catalogController");
const catalogPropertyController = require("../controllers/catalogPropertyController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", CatalogController.getAll);

router.post("/", authMiddleware, CatalogController.create);

router.patch("/:id", authMiddleware, CatalogController.edit);

router.post("/:id", CatalogController.createCatalogProperties);

router.delete("/:id", authMiddleware, CatalogController.delete);

module.exports = router;
