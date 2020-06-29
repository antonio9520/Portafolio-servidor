const express = require("express");
const upload = require("../libs/storage");
const imagenControllers = require("../controllers/imagenControllers");

const router = express.Router();

//imagen
///api/imagen
router.post("/", upload.single("imageURL"), imagenControllers.imagenPost);


module.exports = router;