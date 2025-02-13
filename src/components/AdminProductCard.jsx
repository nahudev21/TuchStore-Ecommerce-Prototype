import { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";

export default function AdminProductCard({ data, getProducts }) {

  const [ editProduct, setEditProduct ] = useState(false);

  return (
    <div className="w-[200px] h-[250px] bg-white rounded">
      <div 
        onClick={() => setEditProduct(true)} 
        className="w-fit ml-auto text-[#4189e6b7] cursor-pointer p-2 text-[16px] hover:scale-[105%] cursor-pointer"
      >
        <MdModeEdit />
      </div>
      <div className="bg-white rounded w-[120px] h-[120px] mx-auto">
        <img src={data?.images[0]} className="w-full h-full object-contain" />
      </div>
      <div className="w-full h-150px p-2 ">
        <h1 className="text-[14px] ">{data.name}</h1>
      </div>
      {editProduct && (
        <AdminEditProduct onClose={() => setEditProduct(false)} data={data} getProducts={getProducts} />
      )}
    </div>
  );
}
