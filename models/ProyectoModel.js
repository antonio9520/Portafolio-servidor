const mongoose = require("mongoose");

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
  registro: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Proyecto", ProyectoSchema);
