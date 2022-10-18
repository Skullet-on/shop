const Router = require("express");
const router = new Router();
const OrderController = require("../controllers/orderController");
const { body } = require("express-validator");

router.get("/", OrderController.getAll);

router.post(
  "/",
  body("fio").isLength({ min: 1 }).withMessage("Поле не должно быть пустым"),
  body("phone").isLength({ min: 1 }).withMessage("Поле не должно быть пустым"),
  body("city").isLength({ min: 1 }).withMessage("Поле не должно быть пустым"),
  body("street").isLength({ min: 1 }).withMessage("Поле не должно быть пустым"),
  body("building")
    .isLength({ min: 1 })
    .withMessage("Поле не должно быть пустым"),
  OrderController.create
);

router.post("/:id", OrderController.finish);

module.exports = router;
