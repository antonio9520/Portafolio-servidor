const Usuario = require("../models/UsuarioModel");
const bcryptjs = require("bcryptjs");

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
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "no se pudo autenticar" });
  }
};
