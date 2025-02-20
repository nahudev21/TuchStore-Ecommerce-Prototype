import { API_URL } from "./config";

export const addToCart = (e, id) => {
  e?.stopPropagation();
  e?.preventDefault();
  console.log("Producto agregado", id)
}