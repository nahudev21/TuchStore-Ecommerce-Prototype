import { useEffect, useState } from "react";
import oferta_banner1 from "../assets/oferta_banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

export default function ProductBanner() {

  const [ currentImage, setCurrentImage ] = useState(0)

  const desktopImages = [
    oferta_banner1,
    banner2,
    banner3,
  ];

  const movileImages = [];

  const nextImage = () => {
    if(desktopImages.length -1 > currentImage) {
      setCurrentImage((preve) => preve + 1);
    } else {
      setCurrentImage(0);
    }
  }

  const previusImage = () => {
    if (currentImage != 0) {
      setCurrentImage((preve) => preve - 1);
    } else {
      setCurrentImage(desktopImages.length -1);
    }
  }

  useEffect(() => {

    const interval = setInterval(() => {
      if(desktopImages.length -1 > currentImage) {
        nextImage();
      } else {
        setCurrentImage(0);
      }
    }, 5000)

    return () => clearInterval(interval);

  }, [currentImage])
   
  return (
    <div className="container mx-auto px-4 rounded mt-2">
      <div className="w-full h-60 md:h-72 relative bg-slate-200">
        <div className="absolute z-10 h-full w-full md:flex items-center hidden">
          <div className="flex justify-between w-full text-2xl">
            <button className="text-white" onClick={previusImage}>
              <FaAngleLeft />
            </button>
            <button className="text-white" onClick={nextImage}>
              <FaAngleRight />
            </button>
          </div>
        </div>
        
        {/** Versión desktop y tablet */}
        <div className="flex h-full w-full overflow-hidden">
          {desktopImages.map((imageUrl, index) => {
            return (
              <div
                key={index}
                className="w-full h-full min-w-full min-h-full transition-all"
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={imageUrl} className="w-full h-full object-contain" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
