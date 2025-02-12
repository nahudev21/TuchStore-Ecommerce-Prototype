import { GoSearch } from "react-icons/go";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logoutRequest } from "../api/auth";
import { toast } from "react-toastify";
import { logout } from "../store/slices/userSlice";
import { useState } from "react";
import Role from "../common/Rol";

export default function Header() {

  const [ menuDisplay, setMenuDisplay ] = useState(false);

  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.user);
  const isAdmin = user?.roles?.some((role) => role.name === Role.ADMIN);

  const handleLogout = async () => {
    const res = await logoutRequest(token);

    if(res.success === true) {
      toast(res.message);
      dispatch(logout());
    } else {
      toast(res.message)
    }
  }

  return (
    <header className="h-16 shadow-md bg-white">
      <div className="container h-full mx-auto flex items-center justify-between px-4">
        <Link to="/">
          <div className="flex items-center justify-center">
            <span className="text-2xl text-black font-bold">Tuch</span>
            <span className="text-2xl text-[#ff5100] font-bold">Store</span>
          </div>
        </Link>

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
          <div className="relative flex justify-center">
            {user?.id && (
              <div
                className="text-2xl cursor-pointer"
                onClick={() => {
                  setMenuDisplay((prev) => !prev);
                }}
              >
                {user ? (
                  <span className="text-black font-bold text-[14px]">
                    Bienvenido {user.firstName}
                  </span>
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}
            {menuDisplay && (
              <div className="absolute bg-white font-bold text-[14px] top-10 bottom-0 h-fit p-2 shadow-lg rounded-sm">
                <nav>
                  {isAdmin && (
                    <Link
                      to="/admin-panel"
                      className="whitespace-nowrap hover:text-[#eb611f] hidden md:block p-1 rounded-sm"
                      onClick={() => {
                        setMenuDisplay((prev) => !prev);
                      }}
                    >
                      Mi Cuenta
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>

          <div className="text-[23px] cursor-pointer relative">
            <span>
              <FaShoppingCart />
            </span>
            <div className="bg-[#ff5100] text-white w-4 h-4 p-1 flex items-center justify-center rounded-full absolute -top-1 -right-1">
              <p className="text-[12px]">0</p>
            </div>
          </div>

          <div className="p-2">
            {token ? (
              <button
                onClick={handleLogout}
                className="px-3 py-[2px] rounded-[15px] text-[15px] text-white bg-[#eb611f] hover:bg-[#ff5100] hover:scale-[102%] transition-all"
              >
                Cerrar sesión
              </button>
            ) : (
              <Link to="/login">
                <button
                  className="px-3 py-[2px] rounded-[15px] text-[15px] text-white bg-[#eb611f] hover:bg-[#ff5100] 
                  hover:scale-[102%] transition-all"
                >
                  Iniciar Sesión
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
