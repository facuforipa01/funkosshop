const express = require("express");
const router = express.Router();

const controller = require("../controllers/mainController");

router.get("/", controller.index);
router.get("/shop", controller.shop)
router.get("/item/:id", controller.item)
router.get("/cart", controller.cart)
router.get("/about", controller.about)

module.exports = router;