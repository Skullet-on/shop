const Router = require("express");
const router = new Router();
const BrandController = require("../controllers/brandController");
const authMiddleware = require("../middleware/authMiddleware");
const { body } = require("express-validator");

router.get("/", BrandController.getAll);

router.post(
  "/",
  body("name")
    .isLength({ min: 2, max: 32 })
    .withMessage("Название должно содержать от 2 до 32 символов"),
  authMiddleware,
  BrandController.create
);

router.patch(
  "/:id",
  body("name")
    .isLength({ min: 2, max: 32 })
    .withMessage("Название должно содержать от 2 до 32 символов"),
  authMiddleware,
  BrandController.edit
);

router.delete("/:id", authMiddleware, BrandController.delete);

module.exports = router;
