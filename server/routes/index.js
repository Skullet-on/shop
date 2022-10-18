const Router = require("express");
const router = new Router();

const productRouter = require("./productRouter");
const userRouter = require("./userRouter");
const catalogRouter = require("./catalogRouter");
const brandRouter = require("./brandRouter");
const colorRouter = require("./colorRouter");
const propertyRouter = require("./propertyRouter");
const catalogPropertyRouter = require("./catalogPropertyRouter");
const orderRouter = require("./orderRouter");
const orderProductRouter = require("./orderProductRouter");

router.use("/users", userRouter);
router.use("/catalog", catalogRouter);
router.use("/brand", brandRouter);
router.use("/product", productRouter);
router.use("/color", colorRouter);
router.use("/property", propertyRouter);
router.use("/catalog-property", catalogPropertyRouter);
router.use("/order", orderRouter);
router.use("/order-product", orderProductRouter);

module.exports = router;
