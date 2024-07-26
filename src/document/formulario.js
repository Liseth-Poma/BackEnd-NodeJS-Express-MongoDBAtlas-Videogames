
class Formulario {

    constructor(nombre, cedula, email, telefono, idVideojuego, idDescuento, total, subtotal) {
      this.nombre = nombre;
      this.cedula = cedula;
      this.email = email;
      this.telefono = telefono;
      this.idVideojuego = idVideojuego;
      this.idDescuento = idDescuento;
      this.total = total;
      this.subtotal = subtotal;
    }
  }
  
  module.exports = Formulario;