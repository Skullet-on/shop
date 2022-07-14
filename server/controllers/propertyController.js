const { Property, CatalogProperty } = require("../models/models");

class PropertyController {
  async create(req, res) {
    const { name, type } = req.body;
    const property = await Property.create({
      name: name.toLowerCase(),
      type: type.toLowerCase(),
    });

    return res.json(property);
  }

  async edit(req, res) {
    const { name, type } = req.body;
    const { id } = req.params;

    let property;

    if (type === "number") {
      property = await Property.update(
        {
          name: name.toLowerCase(),
          type: type.toLowerCase(),
        },
        { where: { id } }
      );
    } else {
      property = await Property.update(
        {
          name: name.toLowerCase(),
          type: type.toLowerCase(),
        },
        { where: { id } }
      );
    }

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
