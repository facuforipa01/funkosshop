const { DataTypes } = require("sequelize");
const sequelize = require("./db.js");

const User = require("./User");
const Product = require("./Product");

const Cart = sequelize.define("Cart", {
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
});

Cart.belongsTo(User);
Cart.belongsTo(Product);

module.exports = Cart;

(async() => {await sequelize.sync()})();