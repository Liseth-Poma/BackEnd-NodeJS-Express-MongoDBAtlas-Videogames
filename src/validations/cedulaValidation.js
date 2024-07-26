// validations/cedulaValidation.js

module.exports = {
    validateEcuadorianCedula: function(cedula) {
      if (cedula.length !== 10) {
        return false;
      }
  
      const digito_region = cedula.substring(0, 2);
      if (digito_region < 1 || digito_region > 24) {
        return false;
      }
  
      const ultimo_digito = parseInt(cedula.substring(9, 10));
      const pares = parseInt(cedula.substring(1, 2)) +
                    parseInt(cedula.substring(3, 4)) +
                    parseInt(cedula.substring(5, 6)) +
                    parseInt(cedula.substring(7, 8));
  
      const getImparesSum = (cedula) => {
        let sum = 0;
        for (let i = 0; i < 9; i += 2) {
          let num = parseInt(cedula.charAt(i)) * 2;
          sum += num > 9 ? num - 9 : num;
        }
        return sum;
      };
  
      const impares = getImparesSum(cedula);
      const suma_total = pares + impares;
      const primer_digito_suma = parseInt(String(suma_total).substring(0, 1));
      const decena = (primer_digito_suma + 1) * 10;
      const digito_validador = decena - suma_total === 10 ? 0 : decena - suma_total;
  
      return digito_validador === ultimo_digito;
    }
  };
  