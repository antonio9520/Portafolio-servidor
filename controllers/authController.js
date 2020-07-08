const Usuario = require("../models/UsuarioModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.userAuth = async (req, res) => {
  const { email, password } = req.body;
  try {
    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    const passCorrecto = await bcryptjs.compare(password, usuario.password);
    if (!passCorrecto) {
      return res.status(500).json({ msg: "La contraseña es incorrecta" });
    }

    const payload = {
      usuario: {
        id: usuario.id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) throw error;

        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "no se pudo autenticar" });
  }
};

exports.usuarioAutenticado = async (req, res) => {
  try {
    const usuario = await (await Usuario.findById(req.usuario.id)).isSelected(
      "-password"
    );
    res.json({ usuario });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
