const { Order, OrderProduct } = require("../models");
const { validationResult } = require("express-validator");
const ApiError = require("../error/ApiError");

class OrderController {
  async create(req, res, next) {
    try {
      const { errors } = validationResult(req);
      const formatErrors = errors.reduce((acc, curr) => {
        return { ...acc, [curr.param]: { message: curr.msg } };
      }, {});

      if (errors.length) {
        return next(
          ApiError.badRequest(400, "Ошибка при валидации", formatErrors)
        );
      }

      const {
        fio,
        phone,
        description,
        city,
        street,
        building,
        corp,
        flat,
        postoffice,
        deliveryType,
        products,
      } = req.body;

      const order = await Order.create({
        fio,
        phone,
        description,
        city,
        street,
        building,
        corp,
        flat,
        postoffice,
        deliveryType
      });

      products.map(async (product) => {
        await OrderProduct.create({
          orderId: order.id,
          price: product.price,
          count: product.count,
          productId: product.productId,
          colorId: product.colorId,
        });
      });

      return res.json(order);
    } catch (error) {
      return next(ApiError.badRequest(400, "Ошибка при валидации", error));
    }
  }

  async getAll(req, res) {
    const orders = await Order.findAll({
      order: [["isDone"], ["createdAt"]],
    });

    return res.json(orders);
  }

  async finish(req, res) {
    const { id } = req.params;

    const order = await Order.update(
      {
        isDone: true,
      },
      { where: { id } }
    );

    return res.json(order);
  }
}

module.exports = new OrderController();
