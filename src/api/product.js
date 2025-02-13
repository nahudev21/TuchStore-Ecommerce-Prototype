import { API_URL } from "../api/config";

export const createProductRequest = async (product) => {
  const productMapper = {
    name: product.name,
    brand: product.brand,
    price: product.price,
    inventory: product.inventory,
    status: product.status,
    description: product.description,
    category: product.category,
  };

  try {
    const response = await fetch(`${API_URL}/products/add`, {
      method: "POST",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(productMapper),
    });
    if (response.ok) {
      const json = await response.json();
      console.log(json);
      return {
        success: true,
        data: json.data,
        message: "Producto creado con éxito!",
      };
    } else {
      if (response.status === 401) {
        return { success: false, message: "Token incorrecto!" };
      }
    }
  } catch (error) {
    console.log("Error de red o de conexión:", error);
    return { message: "Error de red o de conexión" };
  }
};