const { Op } = require("sequelize");
const { CatalogProperty } = require("../models/models");

class CatalogPropertyController {
  async create(req, res) {
    const { catalogId, propertyId } = req.body;

    const catalogProperty = CatalogProperty.create({
      catalogId,
      propertyId,
    });

    return res.json(catalogProperty);
  }

  async remove(req, res) {
    const { catalogId, propertyId } = req.body;

    let property = CatalogProperty.destroy({
      where: { [Op.and]: [{ propertyId }, { catalogId }] },
    });

    return res.json(property);
  }
}

module.exports = new CatalogPropertyController();
