import Cookies from "js-cookie";
import axiosClient from "./clienteAxios.js"

export const verifyUser = async () => {
    try {
      // Obtener el token JWT de las cookies
      const token = Cookies.get("authToken");
  console.log("token", token)
      if (token) {
        // Enviar el token al backend para verificar al usuario
        const response = await axiosClient.get("/verificaUsuario", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        return response.data; // Devolver los datos del usuario verificados
      } else {
        return null; // Si no hay token, el usuario no está autenticado
      }
    } catch (error) {
      console.error("Error verificando usuario", error);
      return null; // Si hay algún error, el usuario no está autenticado
    }
  };