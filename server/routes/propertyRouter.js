const Router = require("express");
const router = new Router();
const PropertyController = require("../controllers/propertyController");
const authMiddleware = require("../middleware/authMiddleware");
const { body } = require("express-validator");

router.post(
  "/",
  body("name")
    .isLength({ min: 3, max: 32 })
    .withMessage("Название должно содержать от 3 до 32 символов"),
  authMiddleware,
  PropertyController.create
);

router.patch(
  "/:id",
  body("name")
    .isLength({ min: 3, max: 32 })
    .withMessage("Название должно содержать от 3 до 32 символов"),
  authMiddleware,
  PropertyController.edit
);

router.get("/", PropertyController.getAll);

router.get("/:id", PropertyController.getCatalogPropertiesAll);

module.exports = router;
