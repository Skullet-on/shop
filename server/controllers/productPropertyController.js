const { ProductProperty } = require("../models/index.js");

class ProductPropertyController {
  async getAll(req, res) {
    try {
      const { propertyId } = req.params;
      const productProperty = await ProductProperty.findAll({
        where: { propertyId: Number(propertyId) },
      });

      return res.json(productProperty);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ProductPropertyController();
