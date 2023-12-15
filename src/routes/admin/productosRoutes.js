const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const { body } = require("express-validator");

const validations = [
  body("nombre")
    .not()
    .isEmpty()
    .withMessage("El nombre es obligatorio")
    .bail()
    .isLength({ min: 2 })
    .withMessage("Tiene que tener 2 caracteres"),
  // .bail()
  // .isAlpha()
  // .withMessage("Solo puede tener letras"),
  body("precio").not().isEmpty().withMessage("El precio es obligatorio"),
  body("CategoryId").not().isEmpty().withMessage("El categoría es obligatorio"),
];

const controller = require("../../controllers/admin/productosController");

// CRUD = Create, Read, Update, Delete

router.get("/", controller.getAdminView);

router.get("/create", controller.getCreateProductView);
router.post("/create", upload.any("imagen"), validations, controller.createProduct);

router.get("/:id/edit", controller.getEditView);
router.put("/:id", upload.any("imagen"), validations, controller.editProduct);

router.delete("/:id", controller.destroy);

module.exports = router;