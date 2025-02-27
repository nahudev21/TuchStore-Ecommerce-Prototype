import { getAllCategories } from "../api/category";
import categoriesHeader from '../helpers/categoriesHeader';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CategoryList() {

  const [ categoryProduct, setCategoryProduct ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  const getCategories = async () => {
    setLoading(true);
    const res = await getAllCategories();
    setLoading(false);
    setCategoryProduct(res.data);
  } 

  console.log("c", categoryProduct);

  useEffect(() => {
    getCategories();
  }, [])

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between gap-4 overflow-scroll scrollbar-none">
        {categoriesHeader.map((product, index) => {
          return (
            <Link
              to={"/product-category?category="+ product?.category}
              key={index}
              className="cursor-pointer"
            >
              <div className="w-20 h-20 md:w-20 md:h-20 rounded-full overflow-hidden p-3 bg-slate-200 flex items-center justify-center">
                <img
                  src={product?.path}
                  className="w-full h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all "
                />
              </div>
              <p className="text-center text-[14px] font-medium md:text-base">
                {product.value}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
