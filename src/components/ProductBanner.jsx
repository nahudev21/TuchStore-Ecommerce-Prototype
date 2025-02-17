import { useState } from "react";
import image1_banner from "../assets/Banner2_home.png";
import image2_banner from "../assets/image2_banner.webp";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

export default function ProductBanner() {

  const [ currentImage, setCurrentImage ] = useState(0)

  const desktopImages = [
    image1_banner,
    image2_banner,
  ];

  const movileImages = [];

  const nextImage = () => {
    if(desktopImages.length -1 > currentImage) {
      setCurrentImage((preve) => preve + 1);
    }
  }

  const previusImage = () => {
    if (currentImage != 0) {
      setCurrentImage((preve) => preve - 1);
    }
  }
   
  return (
    <div className="container mx-auto px-4 rounded ">
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
        <div className="flex h-full w-full overflow-hidden bg-black">
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
