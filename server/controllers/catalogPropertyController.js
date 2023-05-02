const { Op } = require("sequelize");
const { CatalogProperty } = require("../models");

class CatalogPropertyController {
  async create(req, res) {
    try {
      const { catalogId, propertyId } = req.body;

      const catalogProperty = CatalogProperty.create({
        catalogId,
        propertyId,
      });

      return res.json(catalogProperty);
    } catch (error) {
      console.log("error", error);
    }
  }

  async removeProperty(req, res) {
    const { catalogId, propertyId } = req.body;

    let property = CatalogProperty.destroy({
      where: { [Op.and]: [{ propertyId }, { catalogId }] },
    });

    return res.json(property);
  }
}

module.exports = new CatalogPropertyController();
