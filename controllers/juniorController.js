const Junior = require("../models/junior");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.crearJunior = async (req, res) => {
  const errores = validationResult(req); // req -> request para retornar si hay algún error y lo genera como un array
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { email, password } = req.body;

  try {
    let junior = await Junior.findOne({ email });
    if (junior) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    junior = new Junior(req.body);

    const salt = await bcrypt.genSalt(10);
    junior.password = await bcrypt.hash(password, salt);

    await junior.save();

    const payload = {
      junior: {
        id: junior.id,
      },
    };

    // Firmar el jwt
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600, // 1 hora
      },
      (error, token) => {
        if (error) throw error;

        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};
