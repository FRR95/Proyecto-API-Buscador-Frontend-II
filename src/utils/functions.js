export const validame = (type, value) => {
    switch (type) {
      case "name":
      case "nombre":
      case "first_name":
      case "service_name":
      case "description":
      case "last_name":
      case "surname":
      case "cognom":
        if (value.length < 3) {
          return "Por favor, el nombre debe de tener mínimo tres caracteres.";
        }
  
        return "";
      case "id":
        if (!value) {
          return "Por favor, introduzca una Id";
        }
        return "";
      case "email":
      case "e-mail":
      case "correo":
      case "mail":
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  
        if (!emailRegex.test(value)) {
          return "Por favor, el formato del email debe de ser correcto.";
        }
  
        return "";
  
      case "password":
      case "password_hash":
      case "contraseña":
        if (value.length < 6 || value.length > 10) {
          return "La contraseña debe de tener un minimo de 6 caracteres y un maximo de 10";
        }
  
        return "";
      default:
        console.log("Something went wrong!");
    }
  };