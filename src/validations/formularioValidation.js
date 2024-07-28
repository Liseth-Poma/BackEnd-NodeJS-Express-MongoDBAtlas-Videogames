// validations/formularioValidation.js

const { validateEcuadorianCedula } = require('./cedulaValidation');
const validator = require('validator');

module.exports = {
  validateFormulario: function(data) {
    const errors = [];

    // Validación del nombre
    if (!data.nombre || !/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{3,50}$/.test(data.nombre)) {
      errors.push('El nombre debe contener solo letras, acentos y espacios, y tener entre 3 y 50 caracteres.');
    }
    
    
        // Validación del email
        if (!data.email || !validator.isEmail(data.email)) {
          errors.push('Debe ser un correo electrónico válido.');
        }
    
        // Validación del teléfono
        if (!data.telefono || !/^\d{10}$/.test(data.telefono)) {
          errors.push('El teléfono debe contener exactamente 10 dígitos.');
        }
    
        // Validación de cédula
        if (!data.cedula || !validateEcuadorianCedula(data.cedula)) {
          errors.push('La cédula ecuatoriana es inválida.');
        }
    
        // Validación del id de videojuego
        if (!data.idVideojuego || ![1, 2, 3, 4, 5].includes(data.idVideojuego)) {
          errors.push('El id del videojuego debe estar entre 1 y 5.');
        }
    
        // Validación del precio, total y subtotal
        const validateNumber = (value) => {
          return !isNaN(value) && value > 0;
        };
    
        if (!validateNumber(data.precio)) {
          errors.push('El precio debe ser un número válido.');
        }
        if (!validateNumber(data.total)) {
          errors.push('El total debe ser un número válido.');
        }
        if (!validateNumber(data.subtotal)) {
          errors.push('El subtotal debe ser un número válido.');
        }

    return errors;
  }
};
