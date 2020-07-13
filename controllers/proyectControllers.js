const Proyecto = require("../models/ProyectoModel");
const { appConfig } = require("../config/config");

//POST
exports.proyectoSave = async (req, res) => {
  try {
    const { nombre, descripcion, lenguajes, gitURL, proyectURL, servidorURL } = req.body;

    const proyecto = Proyecto({
      nombre,
      descripcion,
      lenguajes,
      gitURL,
      servidorURL,
      proyectURL,
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

//PUT
exports.proyectoEdit = async (req, res) => {
  const { nombre, descripcion, lenguajes, gitURL, proyectURL, servidorURL } = req.body;

  const newProyect = {};
  if (nombre) {
    newProyect.nombre = nombre;
  }
  if (descripcion) {
    newProyect.descripcion = descripcion;
  }
  if (lenguajes) {
    newProyect.lenguajes = lenguajes;
  }
  if (gitURL) {
    newProyect.gitURL = gitURL;
  }
  if (proyectURL) {
    newProyect.proyectURL = proyectURL;
  }
  if (servidorURL) {
    newProyect.servidorURL = proyectURL;
  }
  if (req.file) {
    const { filename } = req.file;
    const { host, port } = appConfig;
    newProyect.imageURL = `${host}:${port}/public/${filename}`;
  }
  try {
    let proyecto = await Proyecto.findById(req.params.id);

    if (!proyecto) {
      return res.status(404).json({ msg: "El proyecto no existe" });
    }

    const editproyecto = await Proyecto.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: newProyect },
      { new: true }
    );

    res.send({ editproyecto });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "no se pudo editar el proyecto" });
  }
};

//GET
exports.getProyects = async (req, res) => {
  try {
    const proyectos = await Proyecto.find();
    res.send({ proyectos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "hubo un error al obtener los proyectos" });
  }
};

//delete
exports.deleteProyect = async (req, res) => {
  try {
    let proyecto = await Proyecto.findById(req.params.id);

    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no existe" });
    }

    await Proyecto.findByIdAndRemove({ _id: req.params.id });
    res.send({ msg: "Proyecto eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "no se puede eliminar" });
  }
};
