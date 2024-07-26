const { getDB } = require('../config/conexion');
const Formulario = require('../document/formulario');
const { ObjectId } = require('mongodb');
const { validateFormulario } = require('../validations/formularioValidation');

exports.getAllFormularios = async (req, res) => {
  try {
    const db = getDB();
    const formularios = await db.collection('Formularios').find().toArray();
    res.json(formularios);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getFormularioById = async (req, res) => {
  const { id } = req.params;

  // Verifica si el ID es un string hexadecimal válido
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ msg: 'Invalid ID format' });
  }

  try {
    const db = getDB();
    const formulario = await db.collection('Formularios').findOne({ _id: new ObjectId(id) });
    if (!formulario) {
      return res.status(404).json({ msg: 'Formulario not found' });
    }
    res.json(formulario);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};


exports.createFormulario = async (req, res) => {
  const { nombre, cedula, email, telefono, idVideojuego, precio, total, subtotal } = req.body;
  const formularioData = { nombre, cedula, email, telefono, idVideojuego, precio, total, subtotal };
  const errors = validateFormulario(formularioData);

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const db = getDB();
    const formulario = new Formulario(nombre, cedula, email, telefono, idVideojuego, precio, total, subtotal);
    await db.collection('Formularios').insertOne(formulario);
    res.status(201).json(formulario);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.updateFormulario = async (req, res) => {
  const { id } = req.params;
  const { nombre, cedula, email, telefono, idVideojuego, precio, total, subtotal } = req.body;
  const formularioData = { nombre, cedula, email, telefono, idVideojuego, precio, total, subtotal };
  const errors = validateFormulario(formularioData);

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const db = getDB();
    const updatedFormulario = await db.collection('Formularios').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: formularioData },
      { returnOriginal: false }
    );
    res.json(updatedFormulario.value);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.deleteFormulario = async (req, res) => {
  const { id } = req.params;
  try {
    const db = getDB();
    await db.collection('Formularios').deleteOne({ _id: new ObjectId(id) });
    res.json({ msg: 'Formulario deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};


