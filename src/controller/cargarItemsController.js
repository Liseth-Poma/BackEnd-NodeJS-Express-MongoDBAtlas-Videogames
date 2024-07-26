const { getDB } = require('../config/conexion');

/////////////////////////
exports.getAllVideojuegos = async (req, res) => {

  try {
    const db = getDB();
    const videojuego = await db.collection('Videojuego').find().toArray();
    res.json(videojuego);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};


exports.getAllDescuentos = async (req, res) => {

  try {
    const db = getDB();
    const descuentos = await db.collection('Descuentos').find().toArray();
    res.json(descuentos);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Erro');
  }
};

// buscar por codigo de descuento
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


exports.getDescuentoByCodigoParam = async (req, res) => {
  const { codigo } = req.query; // Extraer el código desde los parámetros de consulta

  if (!codigo) {
    return res.status(400).json({ msg: 'El código es requerido' });
  }

  try {
    const db = getDB();
    // Buscar el descuento usando el código
    const descuento = await db.collection('Descuentos').findOne({ codigo });

    if (!descuento) {
      return res.status(404).json({ msg: 'Descuento no encontrado' });
    }

    res.json(descuento);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
