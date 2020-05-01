const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");

//Servidor
const app = express();

//Conectar a DB
conectarDB();

app.use(cors());

app.use(express.json({ extended: true }));

const PORT = process.env.PORT || 4000;

//Routes
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/proyectos", require("./routes/proyectos"));
app.use("/api/tareas", require("./routes/tareas"));
app.listen(PORT, () => {
  console.log(
    `El servidor esta funcionando en el puerto ${PORT}`.underline.yellow
  );
});
