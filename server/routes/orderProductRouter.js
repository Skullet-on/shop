const Router = require("express");
const router = new Router();
const OrderProductController = require("../controllers/orderProductController");

router.get("/:id", OrderProductController.getAll);

module.exports = router;
