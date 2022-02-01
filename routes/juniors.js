const express = require("express");
const router = express.Router();
const juniorController = require("../controllers/juniorController");
const { check } = require("express-validator");

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("apellido", "El apellido es obligatorio").not().isEmpty(),
    check("email", "El mail debe de ser válido").isEmail(),
    check("password", "El nombre es obligatorio").isLength({ min: 3 }),
  ],
  juniorController.crearJunior
);

module.exports = router;
