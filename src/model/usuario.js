class User {
    constructor(nombre, cedula, email, telefono, idVideojuego, precio, total, subtotal) {
      this.nombre = nombre;
      this.cedula = cedula;
      this.email = email;
      this.telefono = telefono;
      this.idVideojuego = idVideojuego;
      this.precio = precio;
      this.total = total;
      this.subtotal = subtotal;
    }
  }
  
  module.exports = User;