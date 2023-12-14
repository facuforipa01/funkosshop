const { DataTypes } = require("sequelize");
const sequelize = require("./connect");

const Category = require("./Category");

const Product = sequelize.define("Product", {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING(1000),
        allowNull: false,
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    descuento: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    sku: {
        type: DataTypes.STRING(9),
        allowNull: false,
    },
    cuotas: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    img_frente: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    img_dorso: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

Product.belongsTo(Category);

module.exports = Product;