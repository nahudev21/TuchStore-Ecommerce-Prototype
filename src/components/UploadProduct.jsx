import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import { imageToBase64 } from "../helpers/imageToBase64";
import { createProductRequest, uploadProductImagesRequest } from "../api/product";
import { toast } from "react-toastify";
import DisplayImage from "./DisplayImage";
import { MdDeleteForever } from "react-icons/md";

export default function UploadProduct({ onClose, getProducts }) {

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    sellingPrice: "",
    inventory: "",
    status: "",
    description: "",
    category: "",
    files: [],
  });
  console.log(formData)
  const [ files, setFiles ] = useState({
    files: []
  });

  const [ openFullScreenImage, setOpenFullScreenImage ] = useState(false);
  const [ fullScreenImage, setFullScreenImage ] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
        return {
            ...prev,
            [name]: value
        }
    })
    
  }

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    const image = await imageToBase64(file);
    
    setFormData((prev) => {
        return {
          ...prev,
          files: [ ...prev.files, image ]
        };
    })

    setFiles((prev) => {
        return {
            ...prev,
            files: [...prev.files, file]
        }
    })

  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    const res = await createProductRequest(formData);
    if(res.success) {
      const resImage = await uploadProductImagesRequest(res.data.id, files.files);       
      toast.success(res.message);
      getProducts();
      onClose();
    } else {
      toast.error(res.message);
    }
  }

  const handleDeleteProductImage = (index) => {

    const productImages = [...formData.files];
    productImages.splice(index, 1);

    setFormData((prev) => {
      return {
        ...prev,
        files: [...productImages]
      }
    })

    const productFiles = [...files.files];
    productFiles.splice(index, 1);

    setFiles((prev) => {
      return {
        ...prev,
        files: [...productFiles]
      }
    })
  }
  
  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-50 top-0 bottom-0 right-0 left-0 flex justify-center items-center">
      <div className="bg-white p-4 pb-6 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-gray-800 ml-4 text-lg">
            Cargar un nuevo producto
          </h2>
          <div
            onClick={onClose}
            className="w-fit ml-auto text-gray-500 hover:text-black cursor-pointer text-[18px]"
          >
            <IoMdClose />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 p-4 gap-4 font-medium overflow-y-scroll h-full pb-6"
        >
          <div className="grid gap-1">
            <label htmlFor="name">Nombre del producto</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Nombre del producto"
              value={formData.name}
              required
              onChange={handleChange}
              className="p-1 rounded border border-[#ff5100] outline-none placeholder:text-[14px]"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="brand" className="mt-1 font-medium">
              Marca
            </label>
            <input
              id="brand"
              name="brand"
              type="text"
              placeholder="Nombre de la marca"
              value={formData.brand}
              required
              onChange={handleChange}
              className="p-1 border border-[#ff5100] rounded outline-none placeholder:text-[14px]"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="price" className="mt-1 font-medium">
              Precio
            </label>
            <input
              id="price"
              name="price"
              type="number"
              placeholder="Precio del producto"
              value={formData.price}
              required
              onChange={handleChange}
              className="p-1 border border-[#ff5100] rounded outline-none placeholder:text-[14px]"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="sellingPrice" className="mt-1 font-medium">
              Precio de venta
            </label>
            <input
              id="sellingPrice"
              name="sellingPrice"
              type="number"
              placeholder="Precio del producto"
              value={formData.sellingPrice}
              required
              onChange={handleChange}
              className="p-1 border border-[#ff5100] rounded outline-none placeholder:text-[14px]"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="inventory" className="mt-1 font-medium">
              Inventario
            </label>
            <input
              id="inventory"
              name="inventory"
              type="number"
              placeholder="Stock del producto"
              value={formData.inventory}
              required
              onChange={handleChange}
              className="p-1 border border-[#ff5100] rounded outline-none placeholder:text-[14px]"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="description" className="mt-1 font-medium">
              Descripción
            </label>
            <input
              id="description"
              name="description"
              type="text"
              placeholder="Descripción del producto"
              value={formData.description}
              required
              onChange={handleChange}
              className="p-1 border border-[#ff5100] rounded outline-none placeholder:text-[14px]"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="category" className="mt-1 font-medium">
              Categorías
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              required
              onChange={handleChange}
              className="p-1 border border-[#ff5100] rounded outline-none"
            >
              <option value="" className="text-[16px] font-medium">
                Seleccionar Categoría
              </option>
              {productCategory.map((el, index) => {
                return (
                  <option
                    key={index}
                    value={el.value}
                    className="text-[14px] font-medium"
                  >
                    {el.label}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="grid gap-1 max-h-[40px]">
            <label htmlFor="status" className="mt-1 font-medium">
              Estado
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              required
              onChange={handleChange}
              className="p-1 border  border-[#ff5100] rounded outline-none"
            >
              <option value="" className="text-[16px] font-medium">
                Seleccionar Estado
              </option>
              <option className="text-[14px] font-medium" value="nuevo">
                Nuevo
              </option>
              <option className="text-[14px] font-medium" value="usado">
                Usado
              </option>
            </select>
          </div>
          <div className="grid gap-1">
            <label htmlFor="files" className="mt-1 font-medium">
              Imagen
            </label>
            <label htmlFor="uploadImage">
              <div
                className="p-2 bg-slate-50 border border-[#ff5100] rounded cursor-pointer h-20 w-full 
                flex justify-center items-center"
              >
                <div className="text-slate-500 flex justify-center items-center flex-col">
                  <span className="text-2xl">
                    <FaCloudUploadAlt />
                  </span>
                  <p className="text-sm">Cargar imagen</p>
                  <input
                    type="file"
                    id="uploadImage"
                    className="hidden"
                    onChange={handleUploadImage}
                  />
                </div>
              </div>
            </label>
            {!formData.files[0] && (
              <p className="text-red-500 text-[14px] ">
                Cargar una imagen por favor...
              </p>
            )}
            <div className="grid grid-cols-3 gap-2 mt-4">
              {formData?.files[0] &&
                formData.files.map((el, index) => {
                  return (
                    <div
                      key={index}
                      className="relative w-[80px] h-[80px] group"
                    >
                      <img
                        src={el}
                        alt="Imagen del producto"
                        className="bg-white border w-full h-full object-contain cursor-pointer"
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(el);
                        }}
                      />
                      <div
                        onClick={() => handleDeleteProductImage(index)}
                        className="absolute bottom-0 right-0 p-[2px] text-red-600 hidden group-hover:block hover:scale-[108%]       cursor-pointer"
                      >
                        <MdDeleteForever />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div></div>
          <button className="px-2 py-1 mt-1 bg-[#ff5100] text-white hover:scale-[102%] transition-all">
            Cargar producto
          </button>
        </form>
      </div>
      {openFullScreenImage && (
        <DisplayImage
          imageUrl={fullScreenImage}
          onClose={() => setOpenFullScreenImage(false)}
        />
      )}
    </div>
  );
}
