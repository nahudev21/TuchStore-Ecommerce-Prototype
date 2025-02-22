import { useEffect, useState } from "react";
import { getProductsByCategoryRequest } from "../api/product";
import displayCurrency from "../helpers/displayCurrency";
import { Link } from "react-router-dom";

export default function GridCategoryProductDisplay({ category, heading }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(13).fill(null);

  const getProductsByCategory = async () => {
    setLoading(true);
    const res = await getProductsByCategoryRequest(category);
    setLoading(false);
    setData(res?.data || []);
  };

  useEffect(() => {
    getProductsByCategory();
  }, []);

  return (
    <div className="container mx-auto px-4 py-2 my-4 relative">
      <h2 className="text-2xl font-semibold ">{heading}</h2>
      <div
        className="grid grid-cols-[repeat(auto-fit,minmax(280px,320px))] justify-between md:gap-6 my-6 overflow-x-scroll scrollbar-none transition-all"
      >

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
                  <div className="flex items-center gap-2">
                    <p className="text-black font-medium text-[18px]">
                      {displayCurrency(product?.sellingPrice)}
                    </p>
                    <p className="text-red-400 line-through text-[16px]">
                      {displayCurrency(product?.price)}
                    </p>
                  </div>
                  <button className="px-1 py-[2px] mt-1 bg-[#eb601fe7] w-full text-white text-[14px] hover:bg-[#eb601f]">
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
