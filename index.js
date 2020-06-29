const express = require("express");
const conectDB = require("./config/db");
const cors = require("cors");

const app = express();

conectDB();

app.use(cors());

app.use(express.json({ extended: true }));

const port = process.env.PORT || 4000;
app.use("/public", express.static(`${__dirname}/storage/img`));
app.use("/api/proyectos", require("./routes/proyectos"));
app.listen(port, () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});
