const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");

//---------- CREAR TAREA ----------//
exports.crearTarea = async (req, res) => {
  //Revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    //Extraer el proyecto y comprobar si existe
    const { proyecto } = req.body;

    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    //verificar el creador del proyecto
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    //creamos la tarea
    const tarea = new Tarea(req.body);
    await tarea.save();
    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

//---------- OBTENER TAREA ----------//
exports.obtenerTareas = async (req, res) => {
  try {
    //Extraer el proyecto y comprobar si existe
    //es req.query por que puse params en obtenerTareas en tareaState para obtener el id del proyecto
    const { proyecto } = req.query;

    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    //verificar el creador del proyecto
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    //Obtener las tareas por proyecto
    const tareas = await Tarea.find({ proyecto }).sort({ creado: -1 });
    res.json({ tareas });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo en error");
  }
};

//---------- ACTUALIZAR TAREA ----------//
exports.actualizarTarea = async (req, res) => {
  try {
    //Extraer el proyecto y comprobar si existe
    const { proyecto, nombre, estado } = req.body;

    //revisar si existe la tarea
    let tarea = await Tarea.findById(req.params.id);

    if (!tarea) {
      return res.status(404).json({ msg: "No existe ese tarea" });
    }

    //extraer proyecto
    const existeProyecto = await Proyecto.findById(proyecto);

    //verificar el creador del proyecto
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    //crear un objeto con la nueva información
    const nuevaTarea = {};

    nuevaTarea.nombre = nombre;
    nuevaTarea.estado = estado;

    //Guardar la tarea
    tarea = await Tarea.findOneAndUpdate({ _id: req.params.id }, nuevaTarea, {
      new: true,
    });

    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

//---------- ELIMINAR TAREA ----------//
exports.eliminarTarea = async (req, res) => {
  try {
    //Extraer el proyecto y comprobar si existe
    const { proyecto } = req.query;

    //revisar si existe la tarea
    let tarea = await Tarea.findById(req.params.id);

    if (!tarea) {
      return res.status(404).json({ msg: "No existe ese tarea" });
    }

    //extraer proyecto
    const existeProyecto = await Proyecto.findById(proyecto);

    //verificar el creador del proyecto
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    //eliminar
    await Tarea.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Tarea eliminada" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
