const modelProduct = require("../models/Product");

const index = (req, res) => {
  res.render("index");
};
const cart = (req, res) => {
  res.render("tienda/cart");
};
const about = (req, res) => {
  res.render("tienda/about");
  
};const item = (req, res) => {
  res.render("tienda/item");
};

const shop = async (req, res) => {
  try {
    const productos = await modelProduct.findAll({
      include: "Category",
    });
    res.render("tienda/shop", { productos });
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