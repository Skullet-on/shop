const Router = require("express");
const router = new Router();
const ProductController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");
const { body } = require("express-validator");

router.get("/", ProductController.getAll);

router.post(
  "/",
  body("name")
    .isLength({ min: 5, max: 100 })
    .withMessage("Название должно содержать от 5 до 100 символов"),
  body("price")
    .isNumeric()
    .withMessage("Цена должна быть числом")
    .isInt({ min: 0 })
    .withMessage("Цена не должна быть отрицательна"),
  body("color")
    .isLength({ min: 1 })
    .withMessage("Название цвета не может быть пустым"),
  body("count")
    .isNumeric()
    .withMessage("Количество должно быть числом")
    .isInt({ min: 0 })
    .withMessage("Количество не может быть отрицательным"),
  body("catalogId").isNumeric().withMessage("Каталог не выбран"),
  body("brandId").isNumeric().withMessage("Бренд не выбран"),
  authMiddleware,
  ProductController.create
);

router.patch("/:id", authMiddleware, ProductController.edit);

router.delete("/:id", authMiddleware, ProductController.remove);

router.get("/:id", ProductController.getOne);

module.exports = router;
