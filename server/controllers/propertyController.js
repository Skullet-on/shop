const { Property, CatalogProperty } = require("../models/models");

class PropertyController {
  async create(req, res) {
    const { name } = req.body;
    const property = await Property.create({ name });

    return res.json(property);
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
