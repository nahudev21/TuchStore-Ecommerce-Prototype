import { GoSearch } from "react-icons/go";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logoutRequest } from "../api/auth";
import { toast } from "react-toastify";
import { logout } from "../store/slices/userSlice";
import { useState } from "react";
import Role from "../common/Rol";
import { clearCart } from "../store/slices/cartSlice";

export default function Header() {

  const [ menuDisplay, setMenuDisplay ] = useState(false);

  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.user);
  const isAdmin = user?.roles?.some((role) => role.name === Role.ADMIN);

  const cart = useSelector((state) => state.cart.cart);
  const amountItems = cart?.items.reduce((total, item) => total + item.quantity, 0);

  const navigate = useNavigate();
  const searchInput = useLocation();
  const urlSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = urlSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);
  
  const handleLogout = async () => {
    const res = await logoutRequest(token);

    if(res.success === true) {
      toast(res.message);
      dispatch(logout());
      dispatch(clearCart());
    } else {
      toast(res.message)
    }
  }

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value); 

    if(value) {
      navigate(`/search?q=${value}`)
    } else {
      navigate("/search")
    }
  }

  const hanldeMouseEnter = () => {
    setMenuDisplay(true);
  }

  const hanldeMouseLeave = () => {
    setMenuDisplay(false);
  };

  return (
    <header className="h-16 w-full shadow-md bg-white fixed z-40">
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
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[50px] h-8 text-white bg-[#ff5100] flex items-center justify-center rounded-r-full">
            <GoSearch />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div
            className="relative flex justify-center"
            onMouseEnter={hanldeMouseEnter}
            onMouseLeave={hanldeMouseLeave}
          >
            {user?.id && (
              <div className="text-2xl cursor-pointer">
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
              <div className="w-36 flex justify-center absolute bg-white border-2 border-[#eb611f] font-bold text-[14px] top-9 bottom-0 h-fit p-1 shadow-lg rounded transition-all">
                <nav>
                  {isAdmin ? (
                    <Link
                      to="/admin-panel"
                      className="whitespace-nowrap hover:text-[#eb611f] hidden md:block py-[2px] rounded-sm"
                    >
                      Mi Cuenta
                    </Link>
                  ) : (
                    <Link
                      to=""
                      className="whitespace-nowrap hover:text-[#eb611f] hidden md:block py-[2px] rounded-sm"
                    >
                      Mi Cuenta
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>

          <Link to="/cart" className="text-[23px] cursor-pointer relative">
            <span>
              <FaShoppingCart />
            </span>
            {cart != null && amountItems != 0 && (
              <div className="bg-[#ff5100] text-white w-5 h-5 flex items-center justify-center rounded-full absolute -top-2 -right-2">
                <p className="text-[13px]">{amountItems}</p>
              </div>
            )}
          </Link>

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
