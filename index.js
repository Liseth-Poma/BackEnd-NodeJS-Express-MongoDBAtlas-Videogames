const express = require('express');
const { conexionBDD, getDB } = require('./src/config/conexion');
const usuarioRutas = require('./src/routes/usuarioRutas');
const cargarRutas = require('./src/routes/cargarItemsRutas');
const AppEnv = require('./src/config/appEnv');

const appEnv = new AppEnv(); // Cargar variables de entorno desde el archivo .env

const app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();
});

const PORT = appEnv.get('PORT') || 3000;

// Conectar a la base de datos
conexionBDD().then(() => {
  // Definir las rutas
  app.use('/api/formulario', usuarioRutas);
  app.use('/api/cargar', cargarRutas);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});
