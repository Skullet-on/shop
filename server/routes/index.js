const Router = require("express");
const router = new Router();

const productRouter = require("./productRouter");
const userRouter = require("./userRouter");
const catalogRouter = require("./catalogRouter");
const brandRouter = require("./brandRouter");
const colorRouter = require("./colorRouter");
const propertyRouter = require("./propertyRouter");

router.use("/users", userRouter);
router.use("/catalog", catalogRouter);
router.use("/brand", brandRouter);
router.use("/product", productRouter);
router.use("/color", colorRouter);
router.use("/property", propertyRouter);

module.exports = router;
