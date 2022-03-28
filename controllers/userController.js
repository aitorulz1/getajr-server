const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// Create User

exports.crearUser = async (req, res) => {
  const errores = validationResult(req); // req -> request para retornar si hay algún error y lo genera como un array
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    user = new User(req.body);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
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

// Get a Specific User

exports.getTheUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(400).json({ msg: "El usuario no existe" });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error trayendo todos los usuario");
  }
};

// Edit a Specific User

// exports.editUser = async(req, res) => {
//   try {
//     const newUser = await User.findByIdAndUpdate(req.params.id)
//   } catch (error) {
//     console.log(error);
//     res.status(400).send("Hubo un error editando el usuario");
//   }
// }

// Delete a Specific User

exports.deleteUser = async (req, res) => {
  try {
    const userDeleted = await User.findByIdAndDelete(req.params.id);
    if (!userDeleted) {
      res.status(400).json({ msg: "El usuario no existe" });
    }
    res.json("El usuario se ha eliminado con éxito");
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error eliminando el usuario");
  }
};

// Get all Users

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .populate("projects")
      .populate({
        path: "projects",
        populate: {
          path: "user",
        },
      });
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error trayendo todos los usuario");
  }
};
