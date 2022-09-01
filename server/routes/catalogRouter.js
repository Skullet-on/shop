const Router = require("express");
const router = new Router();
const CatalogController = require("../controllers/catalogController");
const authMiddleware = require("../middleware/authMiddleware");
const { body } = require("express-validator");

router.get("/", CatalogController.getAll);

router.post(
  "/",
  body("name")
    .isLength({ min: 3, max: 32 })
    .withMessage("Название должно содержать от 3 до 32 символов"),
  authMiddleware,
  CatalogController.create
);

router.patch(
  "/:id",
  body("name")
    .isLength({ min: 3, max: 32 })
    .withMessage("Название должно содержать от 3 до 32 символов"),
  authMiddleware,
  CatalogController.edit
);

router.post("/:id", CatalogController.createCatalogProperties);

router.delete("/:id", authMiddleware, CatalogController.delete);

module.exports = router;
