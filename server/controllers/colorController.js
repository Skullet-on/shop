const uuid = require("uuid");
const path = require("path");
const { ProductColors } = require("../models/models");

class ColorController {
  async create(req, res) {
    const { name, productId, count = 0 } = req.body;
    const { img } = req.files;
    let fileName = uuid.v4() + ".jpg";
    img.mv(path.resolve(__dirname, "..", "static", fileName));

    console.log(name, productId, img);

    const color = await ProductColors.create({
      name: name.toLowerCase(),
      img: fileName,
      productId,
      count,
    });

    return res.json(color);
  }

  async getAll(req, res) {
    const colors = await ProductColors.findAll();

    return res.json(colors);
  }
}

module.exports = new ColorController();
