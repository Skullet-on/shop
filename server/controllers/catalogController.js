const { Catalog, CatalogProperty } = require("../models/models");

class CatalogController {
  async create(req, res) {
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
  }

  async edit(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    const catalog = await Catalog.update(
      { name: name.toLowerCase() },
      { where: { id } }
    );

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
