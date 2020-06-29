const express = require("express");
const { check } = require("express-validator");
const  upload  = require("../libs/storage");
const proyectoControllers = require("../controllers/proyectControllers");

const router = express.Router();
//Registra un proyecto
//api/proyecto
router.post("/", upload.single("imageURL"), proyectoControllers.proyectoSave);

router.put("/:id", proyectoControllers.proyectoEdit)
module.exports = router;

router.get("/", proyectoControllers.getProyects)
