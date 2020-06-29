const Usuario = require("../models/UsuarioModel");
const bcryptjs = require("bcryptjs");
exports.postUser = async (req, res) => {
  const { password } = req.body;
  try {
    const usuario = new Usuario(req.body);

    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password, salt);

    await usuario.save();
    res.send({usuario})
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "no se pudo crear el usuario" });
  }
};
