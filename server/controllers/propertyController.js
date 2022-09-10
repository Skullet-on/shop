const { Property, CatalogProperty } = require("../models/models");
const { validationResult } = require("express-validator");
const ApiError = require("../error/ApiError");

class PropertyController {
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

      const { name, type, currency } = req.body;
      const property = await Property.create({
        name: name.toLowerCase(),
        type: type.toLowerCase(),
        currency: currency,
      });

      return res.json(property);
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

      const { name, type, currency } = req.body;
      const { id } = req.params;

      let property;

      if (type === "number") {
        property = await Property.update(
          {
            name: name.toLowerCase(),
            type: type.toLowerCase(),
            currency: currency,
          },
          { where: { id } }
        );
      } else {
        property = await Property.update(
          {
            name: name.toLowerCase(),
            type: type.toLowerCase(),
            currency: currency,
          },
          { where: { id } }
        );
      }

      return res.json(property);
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
    const properties = await Property.findAll();

    return res.json(properties);
  }

  async getCatalogPropertiesAll(req, res) {
    const { id } = req.params;
    const properties = await CatalogProperty.findAll({
      where: { catalogId: id },
      include: [{ model: Property }],
      order: [["id"]],
    });

    return res.json(properties);
  }
}

module.exports = new PropertyController();
