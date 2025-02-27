import { IoMdClose } from "react-icons/io";

export default function DisplayImage({ imageUrl, onClose }) {
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded max-w-5xl mx-auto ">
        <div
          onClick={onClose}
          className="w-fit ml-auto text-gray-500 hover:text-black cursor-pointer text-[18px] p-4"
        >
          <IoMdClose />
        </div>
        <div className="flex justify-center p-4 max-w-[80vh] max-h[80vh] ">
          <img src={imageUrl} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}
