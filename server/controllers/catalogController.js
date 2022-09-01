const { Catalog, CatalogProperty } = require("../models/models");
const { validationResult } = require("express-validator");
const ApiError = require("../error/ApiError");

class CatalogController {
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

      const { name, properties = [] } = req.body;
      const catalog = await Catalog.create({ name: name.toLowerCase() });

      if (properties.length) {
        properties.forEach((property) => {
          CatalogProperty.create({
            catalogId: catalog.id,
            propertyId: property,
          });
        });
      }

      return res.json(catalog);
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
      const catalog = await Catalog.update(
        { name: name.toLowerCase() },
        { where: { id } }
      );

      return res.json(catalog);
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

  async delete(req, res) {
    const { id } = req.params;

    const catalog = await Catalog.destroy({
      where: { id },
    });

    return res.json(catalog);
  }

  async getAll(req, res) {
    const catalogs = await Catalog.findAll({
      include: "properties",
      order: [["id"]],
    });

    return res.json(catalogs);
  }

  async createCatalogProperties(req, res) {
    const { id } = req.params;
    const properties = req.body;
    let property;

    if (properties.length) {
      properties.map((property) => {
        property = CatalogProperty.create({
          catalogId: id,
          propertyId: property.id,
        });
      });
    }

    return res.json(property);
  }
}

module.exports = new CatalogController();
