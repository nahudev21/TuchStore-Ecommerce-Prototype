import { API_URL } from "./config";

export const registerRequest = async (user) => {

  const newUser = {
    firstName: user.name,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
  }

  try {
    const response = await fetch(`${API_URL}/users/add`, {
      method: "POST",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(newUser),
    });
    if (response.ok) {
      const json = await response.json();
      console.log(json);
      return { success: true, data: json };
    } else {
      const errorRequest = await response.json();

      if (response.status === 409) {
        return {
          success: false,
          message: "Ya existe un usuario con esa dirección email",
        };
      }

      return {
        success: false,
        message: errorRequest.message || "Error desconocido",
      };
    }
  } catch (error) {
    console.log("Error de red o de conexión:", error);
    return { message: "Error de red o de conexión" };
  }
};

export const loginRequest = async (user) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    });

    // Verificar si la respuesta es exitosa
    if (response.ok) {
      const json = await response.json();
      console.log("Login exitoso:", json);
      return { success: true, data: json.data, message: "Inicio de sesión exitoso!" }; // Retornar datos si el login es exitoso
    } else {
      // Si la respuesta no es exitosa, manejar los errores de la API
      const errorJson = await response.json();
      if (response.status === 401) {
        // Error de autenticación, por ejemplo, credenciales incorrectas
        console.log("Error 401: Unauthorized", errorJson);
        return { success: false, message: "Credenciales incorrectas" };
      }
      // Para otros códigos de error, como 400, 500, etc.
      console.log("Error en la solicitud", errorJson);
      return {
        success: false,
        message: errorJson.message || "Error desconocido",
      };
    }
  } catch (error) {
    // Aquí atrapamos errores de red u otros problemas con la solicitud
    console.log("Error de red o de conexión:", error);
    return { message: "Error de red o de conexión" }; // Retornar el mensaje de error genérico
  }
};

export const logoutRequest = async (token) => {
  try {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    if(response.ok) {
      return { success: true, message: "Cierre de sesión con éxito!" }
    } else {
      if(response.status === 401) {
        return { success: false, message: "Token incorrecto!" }
      }
    }
  } catch (error) {
    console.log("Error de red o de conexión:", error);
    return { message: "Error de red o de conexión" };
  }
}