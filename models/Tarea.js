const mongosse = require("mongoose");

const TareaSchema = mongosse.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  estado: {
    type: Boolean,
    default: false,
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
  proyecto: {
    type: mongosse.Schema.Types.ObjectId,
    ref: "Proyecto",
  },
});

module.exports = mongosse.model("Tarea", TareaSchema);
