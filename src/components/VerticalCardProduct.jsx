import { useEffect, useRef, useState } from "react";
import { getProductsByCategoryRequest } from "../api/product";
import displayCurrency from "../helpers/displayCurrency";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { addItemToCartRequest, getMyCartRequest } from "../api/cart";
import { useDispatch, useSelector } from "react-redux";
import { setUpdateCart } from "../store/slices/cartSlice";

export default function VerticalproductsHome({ category, heading }) {

  const { user, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(13).fill(null);

  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();

  const getProductsByCategory = async () => {
    setLoading(true);
    const res = await getProductsByCategoryRequest(category);
    setLoading(false);
    setData(res?.data || []);
  };

  useEffect(() => {
    getProductsByCategory();
  }, []);

  const handleAddItemToCart = async (e, product) => {
    const itemadded = await addItemToCartRequest(e, product, token);
  
    const res = await getMyCartRequest(user?.id, token);
    dispatch(setUpdateCart(res))
  }

  const scrollRigth = () => {
    scrollElement.current.scrollLeft += 300;
  };

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-4 py-2 my-4 relative">
      <h2 className="text-2xl font-semibold ">{heading}</h2>
      <div
        className="flex items-center gap-4 md:gap-6 my-4 overflow-x-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        <button
          className="bg-white text-black rounded-full p-1 left-0 absolute hidden md:block"
          onClick={scrollLeft}
        >
          <FaAngleLeft className="hover:scale-110" />
        </button>
        <button
          className="bg-white text-black rounded-full p-1 right-0 absolute hidden md:block"
          onClick={scrollRigth}
        >
          <FaAngleRight className="hover:scale-110" />
        </button>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          data.map((product) => {
            return (
              <Link
                to={"product/" + product.id}
                key={product.id}
                className="min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow "
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
                  </div>
                  <div className="flex flex-col">
                    <p className="text-red-400 line-through text-[15px]">
                      {displayCurrency(product?.price)}
                    </p>
                    <p className="text-black font-medium">
                      {displayCurrency(product?.sellingPrice)}
                    </p>
                  </div>
                  <button 
                    className="px-1 py-[2px] mt-1 bg-[#eb601fe7] w-full text-white text-[14px] hover:bg-[#eb601f]"
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
    </div>
  );
}
