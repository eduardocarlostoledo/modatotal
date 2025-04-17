import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_APP_BACK, // URL base de tu backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para incluir el token en todas las solicitudes
axiosClient.interceptors.request.use(
  (config) => {
    // Obtener el token del localStorage
    const token = localStorage.getItem("token");

    // Si existe el token, agregarlo al encabezado de autorización
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Manejar el error de la solicitud
    return Promise.reject(error);
  }
);

// Opcional: Interceptor para manejar respuestas y errores
axiosClient.interceptors.response.use(
  (response) => {
    // Procesar la respuesta exitosa
    return response;
  },
  (error) => {
    // Manejar errores como respuestas no autorizadas (401)
    if (error.response && error.response.status === 401) {
      // Redireccionar al usuario a la página de login o manejar el error
      console.error("No autorizado, redirigiendo al login...");
      // Puedes redirigir al login usando `window.location.href` o cualquier otra lógica
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
