require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

const sequelize = require("./src/models/connect");

const session = require("cookie-session");

app.use(
  session({
    keys: ["S3cr3t01", "S3cr3t02"],
  })
);


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/src/views"));

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/public")));

const mainRoutes = require("./src/routes/mainRoutes");
app.use(mainRoutes);
const productosRoutes = require("./src/routes/admin/productosRoutes");
app.use(productosRoutes);
const categoriasRoutes = require("./src/routes/admin/categoriasRoutes");
app.use(categoriasRoutes);
const authRoutes = require("./src/routes/authRoutes");
app.use(authRoutes);



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
