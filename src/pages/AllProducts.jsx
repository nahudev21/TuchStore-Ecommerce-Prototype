import { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import { getAllProductsRequest } from "../api/product";
import AdminProductCard from "../components/adminProductCard";

export default function AllProducts() {

  const [ openProductModal, setOpenProductModal ] = useState(false);

  const [ allProducts, setAllProducts ] = useState([]);
  
  const getProducts = async () => {
    const res = await getAllProductsRequest();
    setAllProducts(res?.data || [])
  }

  useEffect(() => {
    getProducts();
  }, [])
  console.log(allProducts)
  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-[16px]">Todos los productos</h2>
        <button
          onClick={() => setOpenProductModal(true)}
          className="px-2 py-[2px] border-2 border-[#ff5100] rounded-[15px] text-[13px] text-black font-medium
          hover:scale-[102%] transition-all"
        >
          Cargar producto
        </button>
      </div>
      <div className="grid grid-cols-5 gap-4 py-4 px-1">
        {
          allProducts.map((product) => {
            return (
              <AdminProductCard data={product} key={product.id} getProducts={getProducts} />
 
            );
          })
        }
      </div> 

      {
        openProductModal && (<UploadProduct onClose={() => setOpenProductModal(false)} />)
      }
    </div>
  );
}
