const express = require("express");
const proyectoControllers = require("../controllers/proyectControllers");

const router = express.Router();
//Registra un proyecto
//api/proyecto
router.post("/", proyectoControllers.proyectoSave);

router.put("/:id", proyectoControllers.proyectoEdit);

router.get("/", proyectoControllers.getProyects);

router.delete("/:id", proyectoControllers.deleteProyect)

module.exports = router;
