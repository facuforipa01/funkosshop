const modelProduct = require("../models/Product");
const modelCategory = require("../models/Category");

const index = (req, res) => {
  res.render("index");
};
const cart = (req, res) => {
  res.render("tienda/cart");
};
const about = (req, res) => {
  res.render("tienda/about");

};const item = async (req, res) => {
  const producto = await modelProduct.findByPk(req.params.id)
  const categoria = await modelCategory.findOne({where: {
    id: producto.CategoryId
  }})
  res.render("tienda/item", {producto, categoria});
};

const shop = async (req, res) => {
  try {
    const productos = await modelProduct.findAll();
    const categorias = await modelCategory.findAll()
    res.render("tienda/shop", { productos, categorias });
  } catch (error) {
    res.status(500).send(error);
  }
};


module.exports = {
  index,
  shop,
  about,
  item,
  cart
};