const express = require("express");
require("dotenv").config();

const cors = require("cors");
// Crea el servidor de express
const app = express();
// Cors
app.use(cors());
// Lectura del body
app.use(express.json());

// Rutas
app.use("/api/items", require("./routes/products"));
// inicializacion de back
app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en puerto " + process.env.PORT);
});
