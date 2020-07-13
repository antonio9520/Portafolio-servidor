const mongoose = require("mongoose");
const { appConfig } = require("../config/config");

const ProyectoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    trim: true,
  },
  descripcion: {
    type: String,
    trim: true,
  },
  lenguajes: {
    type: Array,
  },
  gitURL: {
    type: String,
    trim: true,
  },
  proyectURL: {
    type: String,
    trim: true,
  },
  servidorURL: {
    type: String,
    trim: true,
  },
  imageURL: {
    type: String,
  },
  registro: {
    type: Date,
    default: Date.now(),
  },
});

ProyectoSchema.methods.setImgUrl = function setImgUrl(filename) {
  const { host, port } = appConfig;
  this.imageURL = `${host}:${port}/public/${filename}`;
};

module.exports = mongoose.model("Proyecto", ProyectoSchema);
