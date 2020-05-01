const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });
const colors = require("colors");

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("DB Conectada".bgBlue.black);
  } catch (error) {
    console.log(error.bold.red);
    process.exit(1);
  }
};

module.exports = conectarDB;
