require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const expressLayouts = require("express-ejs-layouts")
const sequelize = require("./src/models/connect");
 
const session = require("cookie-session");

app.use(
  session({
    keys: ["S3cr3t01", "S3cr3t02"],
  })
);

//usa de motor de vistas a ejs
app.set("view engine", "ejs");
//donde estan las vistas
app.set("views", path.join(__dirname, "/src/views"));

app.use(expressLayouts)
app.set("layout", "layouts/layout")

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/public")));

//llamo a los 4 achivos de rutas
const mainRoutes = require("./src/routes/mainRoutes");
const productosRoutes = require("./src/routes/admin/productosRoutes");
const categoriasRoutes = require("./src/routes/admin/categoriasRoutes");
const authRoutes = require("./src/routes/authRoutes");

app.use(mainRoutes, productosRoutes,categoriasRoutes,authRoutes);

// app.use("/admin/productos", require("./src/routes/adminProductosRoutes"));

app.use((req, res, next) => {
  res.status(404).send("La pagina no existe");
});

const PORT = 3000;
app.listen(PORT, async () => {
  try {
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.log(error);
  }

  console.log(`http://localhost:${PORT}`);
});
