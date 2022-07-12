const { Catalog, CatalogProperty } = require("../models/models");

class CatalogController {
  async create(req, res) {
    const { name, properties = [] } = req.body;
    const catalog = await Catalog.create({ name });

    if (properties.length) {
      properties.forEach((property) => {
        CatalogProperty.create({
          catalogId: catalog.id,
          propertyId: property,
        });
      });
    }

    return res.json(catalog);
  }

  async edit(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    const catalog = await Catalog.update({ name }, { where: { id } });

    return res.json(catalog);
  }

  async getAll(req, res) {
    const catalogs = await Catalog.findAll({
      include: "properties",
      order: [["id"]],
    });

    return res.json(catalogs);
  }
}

module.exports = new CatalogController();
