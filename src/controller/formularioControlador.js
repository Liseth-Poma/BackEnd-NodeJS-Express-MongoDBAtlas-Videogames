const { getDB } = require('../config/conexion');
const Formulario = require('../model/formulario');
const { ObjectId } = require('mongodb');

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
  try {
    const db = getDB();
    const formulario = await db.collection('Formularios').findOne({ _id: new ObjectId(id) });
    if (!formulario) {
      return res.status(404).json({ msg: 'Formulario no encontrado' });
    }
    res.json(formulario);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.createFormulario = async (req, res) => {
  const { nombre, cedula, email, telefono, idVideojuego, precio, total, subtotal } = req.body;
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
  try {
    const db = getDB();
    const updatedFormulario = await db.collection('Formularios').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { nombre, cedula, email, telefono, idVideojuego, precio, total, subtotal } },
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
    res.json({ msg: 'Formulario eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
