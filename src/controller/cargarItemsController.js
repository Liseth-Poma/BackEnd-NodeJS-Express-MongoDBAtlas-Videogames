const { getDB } = require('../config/conexion');
const { ObjectId } = require('mongodb');

// Obtener todos los videojuegos
exports.getAllVideojuegos = async (req, res) => {
  try {
    const db = getDB();
    const videojuegos = await db.collection('Videojuego').find().toArray();
    res.json(videojuegos);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Obtener todos los descuentos
exports.getAllDescuentos = async (req, res) => {
  try {
    const db = getDB();
    const descuentos = await db.collection('Descuentos').find().toArray();
    res.json(descuentos);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Obtener un descuento por código
exports.getDescuentoByCodigo = async (req, res) => {
  const { codigo } = req.params;
  try {
    const db = getDB();
    const descuento = await db.collection('Descuentos').findOne({ codigo });

    if (!descuento) {
      return res.status(404).json({ msg: 'Descuento not found' });
    }

    res.json(descuento);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Obtener un descuento por parámetro de consulta
exports.getDescuentoByCodigoParam = async (req, res) => {
  const { codigo } = req.query;

  try {
    const db = getDB();
    const descuento = await db.collection('Descuentos').findOne({ codigo });

    if (!descuento) {
      return res.status(404).json({ msg: 'Descuento not found' });
    }

    res.json(descuento);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
