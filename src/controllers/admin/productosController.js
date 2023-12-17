const { unlink } = require("fs/promises");
const { existsSync } = require("fs");

const path = require("path");
const sharp = require("sharp");

const { validationResult } = require("express-validator");

const model = require("../../models/Product");
const modelCategory = require("../../models/Category");

const getAdminView = async (req, res) => {
  try {
    //traigo los productos
    const productos = await model.findAll();
    //traigo las categorias
    const categorias = await modelCategory.findAll()
    res.render("admin/admin", { productos, categorias });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getCreateProductView = async (req, res) => {
  // res.sendFile(path.resolve(__dirname, "../../views/admin/create.ejs"));

  try {
    const categorias = await modelCategory.findAll();
    console.log(categorias)
    res.render("admin/create", { categorias,
      values: req.body });
  } catch (error) {
    res.status(500).send(error);
  }
};

const createProduct = async (req, res) => {
  console.log(req.body, req.file);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    try {
      const categorias = await modelCategory.findAll();

      return res.render("admin/create", {
        categorias,
        values: req.body,
        errors: errors.array(),
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  try {
    const producto = await model.create(req.body);
    for (const [index, file] of req.files.entries()) {
      const fileName = index === 0 ? "1" : "box"; // Define nombres para cada imagen
      const imagePath = path.resolve(__dirname, `../../../public/uploads/productos/${producto.id}-${fileName}.webp`);
    
      const imagePromise = sharp(file.buffer)
        .resize(600)
        .toFile(imagePath)
        .catch(err => console.log(`Error en la imagen de ${fileName}: ${err}`));
    
      await imagePromise;
    }

    res.redirect("/admin/productos");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getEditView = async (req, res) => {
  try {
    const producto = await model.findByPk(req.params.id);
    // console.log(producto);

    if (producto) {
      const categorias = await modelCategory.findAll();
      res.render("admin/edit", { values: producto, categorias });
    } else {
      res.status(404).send("No existe el producto");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const editProduct = async (req, res) => {
  console.log(req.params, req.body);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    try {
      const categorias = await modelCategory.findAll();

      return res.render("admin/edit", {
        categorias,
        values: req.body,
        errors: errors.array(),
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  try {
    const producto = await model.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    console.log(producto);

    if (req.files.length === 2) {
      for (const [index, file] of req.files.entries()) {
        const fileName = index === 0 ? "1" : "box"; // Define nombres para cada imagen
        const imagePath = path.resolve(__dirname, `../../../public/uploads/productos/${req.params.id}-${fileName}.webp`);

        const imagePromise = sharp(file.buffer)
          .resize(600)
          .toFile(imagePath)
          .catch(err => console.log(`Error en la imagen de ${fileName}: ${err}`));

        await imagePromise;
      }
    }

    res.redirect("/admin/productos");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const destroy = async (req, res) => {
  try {
    const destroyed = await model.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (destroyed == 1) {
      if (
        existsSync(
          path.resolve(
            __dirname,
            `../../../public/uploads/productos/producto_${req.params.id}.jpg`
          )
        )
      ) {
        await unlink(
          path.resolve(
            __dirname,
            `../../../public/uploads/productos/producto_${req.params.id}.jpg`
          )
        );
      }
    }

    res.redirect("/admin/productos");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
  getAdminView,
  getCreateProductView,
  createProduct,
  getEditView,
  editProduct,
  destroy,
};