const { Brand } = require("../models/models");

class BrandController {
  async create(req, res) {
    const { name } = req.body;
    const brand = await Brand.create({ name });

    return res.json(brand);
  }

  async edit(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    const brand = await Brand.update({ name }, { where: { id } });

    return res.json(brand);
  }

  async getAll(req, res) {
    const brands = await Brand.findAll({
      order: [["id"]],
    });

    return res.json(brands);
  }
}

module.exports = new BrandController();
