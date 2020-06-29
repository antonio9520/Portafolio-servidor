const Imagen = require("../models/ImagenesModel")
const Proyecto = require("../models/ProyectoModel");

exports.imagenPost = async (req, res) => {

  const { proyecto } = req.body;

  try {
    const existe = await Proyecto.findById(proyecto);
    if(!existe){
      res.status(404).json({msg: "El proyecto no existe"})
    }
    const imagen = new Imagen({
      proyecto
    });
    if (req.file) {
      const { filename } = req.file;
      imagen.setImgUrl(filename);
    }

    await imagen.save();

    res.send({imagen});
  } catch (error) {
    console.log(error);
    res.status(500).json({msg: "no se pudo agregar la imagen"})
  }
    
}