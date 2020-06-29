const Proyecto = require("../models/ProyectoModel");

exports.proyectoSave = async (req, res) => {
  try {
    const {
      nombre,
      descripcion,
      lenguajes,
      gitURL,
      proyectURL,
      imageURL,
    } = req.body;

    const proyecto = Proyecto({
      nombre,
      descripcion,
      lenguajes,
      gitURL,
      proyectURL,
      imageURL,
    });

    if (req.file) {
      const { filename } = req.file;
      proyecto.setImgUrl(filename);
    }

    const proyectoSend = await proyecto.save();
    res.send({ proyectoSend });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "hubo un error al crear el proyecto" });
  }
};

exports.proyectoEdit = async (req, res) => {
  const { lenguajes } = req.body;
  const editarproyecto = {};
  if (lenguajes) {
    editarproyecto.lenguajes = lenguajes;
  }
  try {
    const proyecto = await Proyecto.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: editarproyecto },
      { new: true }
    );
    res.send({ proyecto });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "hubo un error en actualizar" });
  }
};

exports.getProyects = async (req, res) => {
  try {
    const proyectos = await Proyecto.find();
    res.send({ proyectos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "hubo un error al obtener los proyectos" });
  }
};
