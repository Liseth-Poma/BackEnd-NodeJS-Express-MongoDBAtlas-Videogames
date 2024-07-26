const express = require('express');
const router = express.Router();

// Importar el controlador de formulario
const cargar = require('../controller/cargarItemsController');

// Definir las rutas
router.get('/videojuegos', cargar.getAllVideojuegos);
router.get('/descuentos', cargar.getAllDescuentos);
router.get('/descuentos/:codigo', cargar.getDescuentoByCodigo);
// Definir la ruta para obtener un descuento por código (como parámetro de consulta)
router.get('/des', cargar.getDescuentoByCodigoParam);

module.exports = router;
