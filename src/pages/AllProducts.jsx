import { useState } from "react";
import UploadProduct from "../components/UploadProduct";

export default function AllProducts() {

  const [ openProductModal, setOpenProductModal ] = useState(false);

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
      {
        openProductModal && (<UploadProduct onClose={() => setOpenProductModal(false)} />)
      }
    </div>
  );
}
