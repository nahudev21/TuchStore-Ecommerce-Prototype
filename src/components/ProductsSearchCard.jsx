import displayCurrency from "../helpers/displayCurrency"; 
import scrollTop from "../helpers/scrollTop";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUpdateCart } from "../store/slices/cartSlice";
import { addItemToCartRequest, getMyCartRequest } from "../api/cart";

export default function ProductsSearchCard({ loading, data=[] }) {

  const { user, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleAddItemToCart = async (e, product) => {
    const itemadded = await addItemToCartRequest(e, product, token);

    const res = await getMyCartRequest(user?.id, token);
    dispatch(setUpdateCart(res));
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,300px))] justify-center md:justify-between md:gap-4 overflow-x-scroll scrollbar-none transition-all">
      {loading ? (
        <p>Cargando...</p>
      ) : (
        data.map((product) => {
          return (
            <Link
              to={"/product/" + product.id}
              key={"searchProduct" + product.id}
              className="w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] bg-white rounded-sm shadow"
              onClick={scrollTop}
            >
              <div className="h-48 bg-slate-200 p-4 min-w-[280px] md:min-w-[145px] flex items-center justify-center">
                <img
                  src={product.images[0]}
                  alt={"Imagen" + product?.name}
                  className="w-full h-full object-contain mix-blend-multiply hover:scale-110 transition-all"
                />
              </div>
              <div className="p-2 grid gap-2">
                <div>
                  <h2 className="font-medium text-[14px] md:text-[16px] line-clamp-1">
                    {product?.name}
                  </h2>
                  <span className="block text-[13px] text-[#4189e6b7] font-medium ">
                    Estado {product.status}
                  </span>
                  {product?.inventory > 0 ? (
                    <span className="block text-[13px] font-medium text-slate-400">
                      Stock disponible
                    </span>
                  ) : (
                    <span className="block text-[13px] font-medium text-slate-400">
                      Sin Stock
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-black font-medium text-[18px]">
                    {displayCurrency(product?.sellingPrice)}
                  </p>
                  <p className="text-red-400 line-through text-[16px]">
                    {displayCurrency(product?.price)}
                  </p>
                </div>
                <button
                  disabled={product?.inventory === 0}
                  className="px-1 py-[2px] mt-1 bg-[#eb601fe7] w-full text-white text-[14px] hover:bg-[#eb601f] disabled:cursor-not-allowed"
                  onClick={(e) => handleAddItemToCart(e, product)}
                >
                  Agregar al carrito
                </button>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
}
