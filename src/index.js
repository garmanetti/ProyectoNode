const express = require("express");
const mongoose = require("mongoose");
const setRoutes = require("./routes");
const app = express();

mongoose
  .connect("mongodb://localhost/proyecto", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("Base de datos lista para recibir conexiones");

    app.use("/", setRoutes(express.Router()));

    app.listen(3000, () => {
      console.log("Servidor listo para recibir conexiones");
    });
  })
  .catch(error => {
    console.error(error);

    mongoose.connection.close();
  });
