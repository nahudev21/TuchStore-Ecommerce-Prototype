import { API_URL } from "./config";

export const getAllCategories = async () => {
    try {
        const response = await fetch(`${API_URL}/categories/all`, {
          method: "GET",
          headers: { "Content-type": "Application/json" },
        });
        if (response.ok) {
          const json = await response.json();
          return { success: true, data: json.data, message: "Categorías obtenidas con éxito" }
        } else {
            if(response.status === 404) {
                return { success: false, message: "Categorías no encontradas" };
            }
        }
    } catch (error) {
        console.log("Error de red o de conexión", error);
        return { message: "Error de red o de conexión" };
    }
}