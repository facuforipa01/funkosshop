const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

const model = require("../models/User");

const register = (req, res) => {
  res.render("admin/register");
};
const postRegister = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("admin/register", {
      values: req.body,
      errors: errors.array(),
    });
  }

  try {
    const user = await model.create(req.body);

    // console.log(req.body, user);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const login = (req, res) => {
  res.render("admin/login");
};
const postLogin = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("admin/login", {
      values: req.body,
      errors: errors.array(),
    });
  }

  try {
    const user = await model.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      res.render("admin/login", {
        values: req.body,
        errors: [{ msg: "El correo y/o contraseña son incorrectos (email)" }],
      });
    } else if (!(await bcryptjs.compare(req.body.password, user.password))) {
      res.render("admin/login", {
        values: req.body,
        errors: [
          { msg: "El correo y/o contraseña son incorrectos (password)" },
        ],
      });
    } else {
      req.session.userId = user.id;

      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const logout = (req, res) => {
  req.session = null;
  res.redirect("/");
};

module.exports = {
  register,
  postRegister,
  login,
  postLogin,
  logout,
};