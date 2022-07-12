const { Property } = require("../models/models");

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
}

module.exports = new PropertyController();
