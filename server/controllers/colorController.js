const uuid = require("uuid");
const path = require("path");
const { Color } = require("../models");
const { validationResult } = require("express-validator");
const ApiError = require("../error/ApiError");

class ColorController {
  async create(req, res, next) {
    const { errors } = validationResult(req);

    if (!req.files) {
      errors.push({
        msg: "Фото не выбрано",
        param: "img",
      });
    }

    const formatErrors = errors.reduce((acc, curr) => {
      return { ...acc, [curr.param]: { message: curr.msg, ...curr.data } };
    }, {});

    if (errors.length) {
      return next(
        ApiError.badRequest(400, "Ошибка при валидации", formatErrors)
      );
    }

    const { name, productId, count = 0 } = req.body;
    const { img } = req.files;
    let fileName = uuid.v4() + ".jpg";
    img.mv(path.resolve(__dirname, "..", "static/images", fileName));

    const color = await Color.create({
      name: name.toLowerCase(),
      img: fileName,
      productId,
      count,
    });

    return res.json(color);
  }

  async getAll(req, res) {
    const colors = await Color.findAll();

    return res.json(colors);
  }

  async edit(req, res) {
    const { id } = req.params;
    const { img } = req.files;
    let fileName = uuid.v4() + ".jpg";
    img.mv(path.resolve(__dirname, "..", "static/images", fileName));

    const color = await Color.update(
      {
        img: fileName,
      },
      { where: { id } }
    );

    return res.json(color);
  }
}

module.exports = new ColorController();
