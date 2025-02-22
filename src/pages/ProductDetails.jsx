import { useCallback, useEffect, useState } from "react";
import { getProductByIdRequest } from "../api/product";
import displayCurrency from "../helpers/displayCurrency";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import GridCategoryProductDisplay from "../components/GridCategoryProductDisplay";

export default function ProductDetails() {

  const [data, setData] = useState({
    name: "",
    brand: "",
    price: "",
    sellingPrice: "",
    inventory: "",
    status: "",
    description: "",
    category: "",
    images: [],
  });

  const [ loading, setLoading ] = useState(true);
  const productImageListLoading = new Array(5).fill(null);
  const [ activeImage, setActiveImage ] = useState("");
  const [ zoomImage, setZoomImage ] = useState(false);
  const [ zoomImageCoordinate, setZoomImageCoordinate ] = useState({
    x: 0,
    y: 0,
  })
 
  const { id } = useParams();

  const getProductDetails = async () => {
    setLoading(true);
    setLoading(false);
    const res = await getProductByIdRequest(id);
    setData(res?.data);
    setActiveImage(res?.data?.images[0])
  }  
  console.log(loading)

  useEffect(() => {
    getProductDetails();
  }, [])

  const handleMouseEnterImage = (imageUrl) => {
    setActiveImage(imageUrl);
  }

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();

    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    console.log("Coordinadas", left, top, width, height)

    setZoomImageCoordinate({
      x,
      y
    })
  }, [zoomImageCoordinate]) 

  const handleLeaveZoomImage = () => {
    setZoomImage(false);
  }

  console.log(data)
  return (
    <div className="container mx-auto px-10 py-4 ">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4 p-5">
        {/*imagenes*/}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] 2-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-1">
            <img
              src={activeImage}
              className="w-full h-full object-contain mix-blend-multiply cursor-move"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveZoomImage}
            />
            {/*zoom de la imagen*/}
            {zoomImage && (
              <div className="hidden lg:block absolute z-10 min-w-[400px] min-h-[400px] overflow-hidden bg-slate-200 p-5 -right-[455px] top-0">
                <div
                  className="w-full h-full min-w-[400px] min-h-[400px] mix-blend-multiply scale-[120%]"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                      zoomImageCoordinate.y * 100
                    }%`,
                  }}
                ></div>
              </div>
            )}
          </div>
          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageListLoading.map((el) => {
                  return (
                    <div
                      key={el}
                      className="w-20 h-20 bg-slate-200 rounded animate-pulse"
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data?.images?.map((imgUrl, index) => {
                  return (
                    <div
                      key={index + imgUrl}
                      className="w-20 h-20 bg-slate-200 rounded p-1"
                    >
                      <img
                        src={imgUrl}
                        alt={imgUrl}
                        onMouseEnter={() => handleMouseEnterImage(imgUrl)}
                        onClick={() => handleMouseEnterImage(imgUrl)}
                        className="w-full h-full object-contain mix-blend-multiply cursor-pointer"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {/*detalles*/}
        {loading ? (
          <div className="grid gap-1 w-full">
            <div className="flex items-center gap-2 w-full">
              <p className="bg-slate-200 px-5 py-2 rounded-full inline-block w-fit animate-pulse"></p>
              <span className="block text-[13px] font-medium px-14 py-2 rounded-full bg-slate-200 animate-pulse"></span>
            </div>
            <h2 className="text-2xl font-medium h-6 bg-slate-200 animate-pulse"></h2>
            <span className="block text-[13px] text-[#4189e6b7] font-medium bg-slate-200 min-w-[100px] animate-pulse h-6"></span>
            <p className="capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6"></p>
            <div className="flex text-red-600 gap-1 mt-1 bg-slate-200 h-6 animate-pulse"></div>
            <div className="flex items-center gap-2 mt-1 h-6 animate-pulse w-full">
              <p className="text-black font-medium text-xl bg-slate-200"></p>
              <p className="text-red-400 line-through text-[16px] bg-slate-200"></p>
            </div>
            <div className="flex items-center gap-2 my-2 w-full bg-slate-200">
              <button className="h-6 bg-slate-300 rounded animate-pulse"></button>
              <button className="h-6 bg-slate-300 rounded animate-pulse"></button>
            </div>
            <div className="w-full">
              <p className="text-slate-600 font-medium my-1 h-6 bg-slate-200 rounded animate-pulse w-full"></p>
              <p className="h-10 bg-slate-200 rounded animate-pulse w-full"></p>
            </div>
          </div>
        ) : (
          <div className=" flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <p className="bg-red-200 animate-pulse text-red-600 px-2 rounded-full inline-block w-fit">
                {data?.brand}
              </p>
              {data?.inventory > 0 ? (
                <span className="block text-[13px] font-medium text-slate-400 ">
                  Stock disponible
                </span>
              ) : (
                <span className="block text-[13px] font-medium text-red-400 ">
                  Sin Stock
                </span>
              )}
            </div>
            <h2 className="text-2xl font-medium">{data?.name}</h2>
            <span className="block text-[13px] text-[#4189e6b7] font-medium ">
              Estado {data?.status}
            </span>
            <p className="capitalize text-slate-400">{data?.category}</p>
            <div className="flex text-red-600 gap-1 mt-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalfAlt />
            </div>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-black font-medium text-xl">
                {displayCurrency(data?.sellingPrice)}
              </p>
              <p className="text-red-400 line-through text-[16px]">
                {displayCurrency(data?.price)}
              </p>
            </div>
            <div className="flex items-center gap-2 my-2">
              <button className="px-2 py-1 min-w-[140px] bg-[#4189e6c5] text-white font-medium rounded-sm hover:bg-[#4189e6e3] hover:scale-105 transition-all ">
                Comprar ahora
              </button>
              <button className="px-2 py-1 min-w-[140px] bg-[#eb601fe7] text-white font-medium rounded-sm hover:bg-[#eb601f] hover:scale-105 transition-all ">
                Agregar al carrito
              </button>
            </div>
            <div className="">
              <p className="text-slate-600 font-medium my-1">Descripción:</p>
              <p>{data?.description}</p>
            </div>
          </div>
        )}
      </div>

      {data?.category && (
        <GridCategoryProductDisplay
          category={data?.category}
          heading="Productos relacionados"
        />
      )}
    </div>
  );
}
