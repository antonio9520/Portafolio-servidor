const express = require("express");
const usuarioController = require("../controllers/UsuarioController")
const router = express.Router();

router.post("/", usuarioController.postUser)

module.exports = router;