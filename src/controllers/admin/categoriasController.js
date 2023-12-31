const { validationResult } = require("express-validator");

const model = require("../../models/Category");

const index = async (req, res) => {
  try {
    const categorias = await model.findAll();
    res.render("admin/adminCategoria", { categorias });
  } catch (error) {
    res.status(500).send(error);
  }
};

const create = (req, res) => {
  res.render("admin/createCategoria");
};

const store = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("admin/createCategoria", {
      values: req.body,
      errors: errors.array(),
    });
  }

  try {
    const categoria = await model.create(req.body);
    console.log(categoria);

    res.redirect("/admin/categorias");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const edit = async (req, res) => {
  try {
    const categoria = await model.findByPk(req.params.id);
    console.log(categoria);

    if (categoria) {
      res.render("admin/editCategoria", { values: categoria });
    } else {
      res.status(404).send("No existe el categoria");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  console.log(req.params, req.body);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("admin/editCategoria", {
      values: req.body,
      errors: errors.array(),
    });
  }

  try {
    const affected = await model.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (affected[0] == 1) {
      res.redirect("/admin/categorias");
    } else {
      res.status(400).send("No se actualizo el categoria");
    }
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

    res.redirect("/admin/categorias");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
  index,
  create,
  store,
  edit,
  update,
  destroy,
};