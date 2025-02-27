import { API_URL } from "../api/config";

export const createProductRequest = async (product) => {
  const productMapper = {
    name: product.name,
    brand: product.brand,
    price: product.price,
    sellingPrice: product.sellingPrice,
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


export const editProductRequest = async (product, id) => {
  const productMapper = {
    name: product.name,
    brand: product.brand,
    price: product.price,
    sellingPrice: product.sellingPrice,
    inventory: product.inventory,
    status: product.status,
    description: product.description,
    category: product.category,
  };

  try {
    const response = await fetch(`${API_URL}/products/product/${id}/update`, {
      method: "PUT",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(productMapper),
    });
    if (response.ok) {
      const json = await response.json();
      console.log(json);
      return {
        success: true,
        data: json.data,
        message: "Producto actualizado con éxito!",
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


export const uploadProductImagesRequest = async (productId, files) => {
  let formData = new FormData();
  files.forEach((file, index) => {
    formData.append("files", file); // 'files' es el nombre del parámetro que espera el backend
  });
  formData.append("productId", productId);

  try {
    const response = await fetch(`${API_URL}/images/upload`, {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      const json = await response.json();
      console.log(json);
      return {
        success: true,
        data: json.data,
        message: "Producto creado con éxito!",
      };
    }
  } catch (error) {
    console.log("Error de red o de conexión:", error);
    return { message: "Error de red o de conexión" };
  }
}

export const getProductByIdRequest = async (id) => {
  try {
    const response = await fetch(`${API_URL}/products/product/${id}/product`, {
      method: "GET",
      headers: { "Content-type": "Application/json" },
    });
    if (response.ok) {
      const product = await response.json();
      const imagesId = getImageId(product);

      const images = imagesId.map(async (id) => {
        const image = await getImageRequest(id);
        return image;
      });

      const imagesResuls = await Promise.all(images);

      const modifiedProduct = productMapped(product, imagesResuls);

      return { success: true, data: modifiedProduct, message: "Producto obtenido con éxito!" }
    }
  } catch (error) {
    console.log("Error de red o de conexión:", error);
    return { message: "Error de red o de conexión" };
  }
};

export const getAllProductsRequest = async () => {
  try {
    const response = await fetch(`${API_URL}/products/all`, {
      method: "GET",
      headers: { "Content-type": "Application/json" },
    });

    if (response.ok) {
      const products = await response.json();
      const { data } = products;

      // Usar Promise.all para esperar a que todas las promesas dentro de `map` se resuelvan
      const modifiedProducts = await Promise.all(
        data.map(async (product) => {
          const imagesId = getImageIdFromProducts(product); // Obtener los IDs de las imágenes

          // Para obtener todas las imágenes, usamos map sobre `imagesId` y esperamos que todas se resuelvan
          const images = await Promise.all(
            imagesId.map(async (id) => {
              const image = await getImageRequest(id); // Obtener la imagen para cada id
              return image;
            })
          );

          // Mapear las imágenes obtenidas al producto
          return listProductsMapped(product, images); // Devuelve el producto modificado
        })
      );
      
      return { success: true, data: modifiedProducts, message: "Productos obtenidos con éxito!" } // Retorna el array de productos con las modificaciones
    }
  } catch (error) {
    console.log("Error de red o de conexión:", error);
    return { message: "Error de red o de conexión" };
  }
};

export const getProductsByCategoryRequest = async (category) => {
  try {
    const response = await fetch(
      `${API_URL}/products/${category}/all/products`,
      {
        method: "GET",
        headers: { "Content-type": "Application/json" },
      }
    );
    if (response.ok) {
      const json = await response.json();
      const { data } = json;

      // Usar Promise.all para esperar a que todas las promesas dentro de `map` se resuelvan
      const modifiedProducts = await Promise.all(
        data.map(async (product) => {
          const imagesId = getImageIdFromProducts(product); // Obtener los IDs de las imágenes

          // Para obtener todas las imágenes, usamos map sobre `imagesId` y esperamos que todas se resuelvan
          const images = await Promise.all(
            imagesId.map(async (id) => {
              const image = await getImageRequest(id); // Obtener la imagen para cada id
              return image;
            })
          );

          // Mapear las imágenes obtenidas al producto
          return listProductsMapped(product, images); // Devuelve el producto modificado
        })
      );

      return {
        success: true,
        data: modifiedProducts,
        message: "Productos obtenidos con éxito!",
      };
    }
  } catch (error) {
    console.log("Error de red o de conexión", error);
    return { message: "Error de red o de conexión" };
  }
}


export const filterProductsByCategoriesRequest = async (categories) => {

  const params = new URLSearchParams();
  // Iteramos sobre el arreglo de categorías y agregamos cada categoría a los parámetros de la URL
  categories.forEach((category) => {
    params.append("categoryNames", category);
  });

  try {
    const response = await fetch(`${API_URL}/products/filter/by/categories?${params.toString()}`, {
      method: "GET",
      headers: { "Content-type": "Application/json" },
    });
    if (response.ok) {
      const json = await response.json();
      const { data } = json;

      // Usar Promise.all para esperar a que todas las promesas dentro de `map` se resuelvan
      const modifiedProducts = await Promise.all(
        data.map(async (product) => {
          const imagesId = getImageIdFromProducts(product); // Obtener los IDs de las imágenes

          // Para obtener todas las imágenes, usamos map sobre `imagesId` y esperamos que todas se resuelvan
          const images = await Promise.all(
            imagesId.map(async (id) => {
              const image = await getImageRequest(id); // Obtener la imagen para cada id
              return image;
            })
          );

          // Mapear las imágenes obtenidas al producto
          return listProductsMapped(product, images); // Devuelve el producto modificado
        })
      );

      return {
        success: true,
        data: modifiedProducts,
        message: "Productos obtenidos con éxito!",
      };
    }
  } catch (error) {
    console.log("Error de red o de conexión", error);
    return { message: "Error de red o de conexión" };
  }
};


export const getProductsByNameRequest = async (name) => {
  try {
    const response = await fetch(`${API_URL}/products/${name}/products`, {
      method: "GET",
      headers: { "Content-type": "Application/json" },
    });
    if (response.ok) {
      const json = await response.json();
      const { data } = json;

      // Usar Promise.all para esperar a que todas las promesas dentro de `map` se resuelvan
      const modifiedProducts = await Promise.all(
        data.map(async (product) => {
          const imagesId = getImageIdFromProducts(product); // Obtener los IDs de las imágenes

          // Para obtener todas las imágenes, usamos map sobre `imagesId` y esperamos que todas se resuelvan
          const images = await Promise.all(
            imagesId.map(async (id) => {
              const image = await getImageRequest(id); // Obtener la imagen para cada id
              return image;
            })
          );

          // Mapear las imágenes obtenidas al producto
          return listProductsMapped(product, images); // Devuelve el producto modificado
        })
      );

      return {
        success: true,
        data: modifiedProducts,
        message: "Productos obtenidos con éxito!",
      };
    }
  } catch (error) {
    console.log("Error de red o de conexión", error);
    return { message: "Error de red o de conexión" };
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

const getImageId = (product) => {
  const data = product.data;
  const { images } = data;
  const imageId = images.map((image) => {
    const id = image.imageId;
    return id;
  });

  return imageId;
}; 

const getImageIdFromProducts = (product) => {
  const { images } = product;
  const imageId = images.map((image) => {
    const id = image.imageId;
    return id;
  });
  return imageId;
};

const productMapped = (product, imgs) => {
  return {
    id: product.data.id,
    name: product.data.name,
    description: product.data.description,
    price: product.data.price,
    sellingPrice: product.data.sellingPrice,
    inventory: product.data.inventory,
    status: product.data.status,
    brand: product.data.brand,
    category: product.data.category.name,
    images: imgs,
  };
};

const listProductsMapped = (product, imgs) => {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    sellingPrice: product.sellingPrice,
    inventory: product.inventory,
    status: product.status,
    brand: product.brand,
    category: product.category.name,
    images: imgs,
  };
};
