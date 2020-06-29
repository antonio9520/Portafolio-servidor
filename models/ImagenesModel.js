const mongoose = require("mongoose");
const { appConfig } = require("../config/config");

const ImagenSchema = new mongoose.Schema({
  imageURL: {
    type: String,
  },
  proyecto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Proyecto",
  },
});

ImagenSchema.methods.setImgUrl = function setImgUrl(filename) {
  const { host, port } = appConfig;
  this.imageURL = `${host}:${port}/public/${filename}`;
};

module.exports = mongoose.model("Imagen", ImagenSchema);
