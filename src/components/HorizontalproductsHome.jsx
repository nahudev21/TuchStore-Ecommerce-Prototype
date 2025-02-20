import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getProductsByCategoryRequest } from "../api/product";
import { addToCart } from "../api/cart";
import displayCurrency from "../helpers/displayCurrency";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

export default function HorizontalproductsHome({ category, heading }) {

  const [ data, setData ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const loadingList = new Array(13).fill(null);  

  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();

  const getProductsByCategory = async () => {
    setLoading(true);
    const res = await getProductsByCategoryRequest(category);
    setLoading(false)
    setData(res?.data || []);
  };

  useEffect(() => {
    getProductsByCategory();
  }, []);

  const scrollRigth = () => {
    scrollElement.current.scrollLeft += 300;
  }

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  }; 

  return (
    <div className="container mx-auto px-4 py-2 my-4 relative">
      <h2 className="text-2xl font-semibold ">{heading}</h2>
      <div
        className="flex items-center gap-4 md:gap-6 my-4 overflow-scroll scrollbar-none transition-all"
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
          <p className="">Cargando...</p>
        ) : (
          data.map((product) => {
            return (
              <Link
                to={"product/" + product.id}
                key={product.id}
                className="h-36 min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow flex"
              >
                <div className="h-full bg-slate-200 p-4 min-w-[120px] md:min-w-[145px] ">
                  <img
                    src={product.images[0]}
                    alt={"Imagen" + product?.name}
                    className="w-full h-full object-contain mix-blend-multiply hover:scale-125 transition-all"
                  />
                </div>
                <div className="p-2 grid">
                  <h2 className="font-medium text-[14px] md:text-[16px] line-clamp-1">
                    {product?.name}
                  </h2>
                  <p className="capitalize text-black">{product?.category}</p>
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
                    onClick={(e) => addToCart(e, product?.id)}
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
