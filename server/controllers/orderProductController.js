const { OrderProduct } = require("../models");

class OrderProductController {
  async getAll(req, res) {
    try {
      const { id } = req.params;
      const orders = await OrderProduct.findAll({
        where: { orderId: id },
      });

      return res.json(orders);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
}

module.exports = new OrderProductController();
