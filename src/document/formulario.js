
class Formulario {

    constructor(nombre, cedula, email, telefono, idVideojuego, codigoDescuento, total, subtotal, precio) {
      this.nombre = nombre;
      this.cedula = cedula;
      this.email = email;
      this.telefono = telefono;
      this.idVideojuego = idVideojuego;
      this.codigoDescuento = codigoDescuento;
      this.total = total;
      this.subtotal = subtotal;
      this.precio = precio;
    }
  }
  
  module.exports = Formulario;