const express = require("express");
const proyectoControllers = require("../controllers/proyectControllers");
const upload = require("../libs/storage");

const router = express.Router();
//Registra un proyecto
//api/proyecto
router.post("/", upload.single("imageURL"), proyectoControllers.proyectoSave);

router.put("/:id", proyectoControllers.proyectoEdit);

router.get("/", proyectoControllers.getProyects);

router.delete("/:id", proyectoControllers.deleteProyect)

module.exports = router;
