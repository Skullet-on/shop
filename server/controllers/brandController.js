const { Brand } = require("../models");
const { validationResult } = require("express-validator");
const ApiError = require("../error/ApiError");

class BrandController {
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

      const { name } = req.body;
      const brand = await Brand.create({
        name: name.toLowerCase(),
        label: name,
      });

      return res.json(brand);
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return next(
          ApiError.badRequest(400, "Ошибка при валидации", {
            name: { message: "Такое название уже есть" },
          })
        );
      } else {
        return next(ApiError.badRequest(400, "Ошибка при валидации", error));
      }
    }
  }

  async edit(req, res, next) {
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

      const { id } = req.params;
      const { name } = req.body;
      const brand = await Brand.update(
        { name: name.toLowerCase(), label: name },
        { where: { id } }
      );

      return res.json(brand);
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return next(
          ApiError.badRequest(400, "Ошибка при валидации", {
            name: { message: "Такое название уже есть" },
          })
        );
      } else {
        return next(ApiError.badRequest(400, "Ошибка при валидации", error));
      }
    }
  }

  async getAll(req, res) {
    const brands = await Brand.findAll({
      order: [["id"]],
    });

    return res.json(brands);
  }

  async delete(req, res) {
    const { id } = req.params;

    const brand = await Brand.destroy({
      where: { id },
    });

    return res.json(brand);
  }
}

module.exports = new BrandController();
