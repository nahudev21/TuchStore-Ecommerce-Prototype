import { toast } from "react-toastify";
import { API_URL } from "./config";

export const addItemToCartRequest = async (e, item, token) => {

  e?.stopPropagation();
  e?.preventDefault();

  const params = new URLSearchParams();
  params.append("productId", item.id);
  params.append("quantity", 1);

  try {
    const response = await fetch(`${API_URL}/cartItems/item/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      body: params.toString(),
    });
    if (response.ok) {
      const json = await response.json();
      console.log(json);
      toast.success("Producto agregado al carrito");
      return {success: true, message: "Producto agregado al carrito"};
    } else {
      if(response.status === 401) {
        toast.error("Por favor ingrese con una cuenta")
        return {
          success: false,
          message: "Debes iniciar sesión con una cuenta",
        };
      }
    }
  } catch (error) {
    console.log("Error de red o de conexión:", error);
    return { message: "Error de red o de conexión" };
  }
};

export const addItemsToCartRequest = async (cart, token) => {
  try {
    // Mapeamos el carrito de items para hacer las solicitudes
    const allResponse = await Promise.all(
      cart.map(async (item) => {
        // Suponiendo que 'item' tiene las propiedades 'productId' y 'quantity'
        // Crear un objeto FormData
        let formData = new FormData();
        formData.append("productId", item.id); // Agregar el id del producto
        formData.append("quantity", item.quantity); // Agregar la cantidad

        const response = await fetch(`${API_URL}/cartItems/item/add`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (response.ok) {
          const json = await response.json();
          return {
            success: true,
            data: json,
          };
        } else {
          return {
            success: false,
            error: "Hubo un error en la solicitud",
          };
        }
      })
    );

    return allResponse; // Devolvemos el resultado de todas las solicitudes
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Error en el proceso de solicitud",
    };
  }
};

export const updateItemQuantityRequest = async (
  cartId,
  productId,
  quantity,
  token
) => {
  const params = new URLSearchParams();
  params.append("quantity", quantity);

  try {
    const response = await fetch(
      `${API_URL}/cartItems/cart/${cartId}/item/${productId}/update`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
        body: params.toString(),
      }
    );
    if (response.ok) {
      const json = await response.json();
      console.log(json);
      return json;
    }
  } catch (error) {
    console.error(error);
  }
};

export const removeItemToCart = async (cartId, productId, token) => {
  try {
    const response = await fetch(
      `${API_URL}/cartItems/cart/${cartId}/item/${productId}/remove`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.ok) {
      const json = await response.json();
      console.log(json);
      return json;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getMyCartRequest = async (userId, token) => {
  try {
    const response = await fetch(`${API_URL}/carts/${userId}/my-cart`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const { data } = await response.json();
      console.log("data", data)
      // Usar Promise.all para esperar a que todas las promesas dentro de `map` se resuelvan
      const modifiedProducts = await Promise.all(
        data.items.map(async (item) => {
          // Para obtener todas las imágenes, usamos map sobre `imagesId` y esperamos que todas se resuelvan
          const images = await Promise.all(
            item.product.images.map(async (img) => {
              const image = await getImageRequest(img.imageId); // Obtener la imagen para cada id
              return image;
            })
          );
          // Mapear las imágenes obtenidas al producto
          return cartItemsMapped(item, images); // Devuelve el producto modificado
        })
      ); 
      console.log(modifiedProducts)
      return cartMapped(data.id, modifiedProducts);
    }
  } catch (error) {
    console.error(error);
  }
};

export const getImageRequest = async (id) => {
  try {
    const response = await fetch(`${API_URL}/images/image/download/${id}`, {
      method: "GET",
      headers: { "Content-type": "Application/json" },
    });
    if (response.ok) {
      const json = await response.blob();
      const urlImage = URL.createObjectURL(json);
      //const imageBase = await blobToBase64(json)
      return urlImage;
    }
  } catch (error) {
    console.log(error);
  }
};

export const cartMapped = (cartId, items) => {
  return {
    cartId: cartId,
    items: items,
  };
}

export const cartItemsMapped = (item, imgs) => {
  return {
    id: item.product.id,
    name: item.product.name,
    description: item.product.description,
    price: item.product.price,
    sellingPrice: item.product.sellingPrice,
    inventory: item.product.inventory,
    status: item.product.status,
    brand: item.product.brand,
    category: item.product.category.name,
    images: imgs,
    quantity: item.quantity,
  };
};