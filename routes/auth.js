const express = require("express")
const authController = require("../controllers/authController");
const router = express.Router();
const auth = require("../middleware/auth")

router.post("/",  authController.userAuth)

router.get("/", auth, authController.usuarioAutenticado)

module.exports = router;
