import Logo from './Logo'
import { GoSearch } from "react-icons/go";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="h-16 shadow-md bg-white">
      <div className="container h-full mx-auto flex items-center justify-between px-4">
        <div className="">
          <Logo w={100} h={64} />
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="Buscar un producto aquí..."
            className="w-full outline-none"
          />
          <div className="text-lg min-w-[50px] h-8 text-white bg-[#ff5100] flex items-center justify-center rounded-r-full">
            <GoSearch />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-2xl cursor-pointer">
            <FaRegCircleUser />
          </div>

          <div className="text-2xl cursor-pointer relative">
            <span>
              <FaShoppingCart />
            </span>
            <div className="bg-[#ff5100] text-white w-5 h-5 p-1 flex items-center justify-center rounded-full absolute -top-2 -right-2">
              <p className="text-sm">0</p>
            </div>
          </div>

          <div className="p-2">
            <Link to="/login">
              <button className="px-3 py-[2px] rounded-[15px] text-white bg-[#eb611f] hover:bg-[#ff5100]">
                Iniciar Sesión
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
