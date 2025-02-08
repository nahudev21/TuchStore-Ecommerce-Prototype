import { Link, Outlet } from "react-router-dom";
import iconProfile from "../assets/icon_profile.jpg";
import { useSelector } from "react-redux";

export default function AdminPanel() {

  const { user, token } = useSelector((state) => state.user);

  return (
    <div className="min-h-[calc(100vh-120px)] p-4 md:flex hidden">
      <aside className="bg-white min-h-full w-full max-w-60 shadow-md">
        <div className="w-full h-32 flex items-center justify-center flex-col">
          <img src={iconProfile} className="w-[70px] h-[70px] rounded-full" />
          <p className="font-semibold capitalize text-[15px]">
            {user.firstName} {user.lastName}
          </p>
        </div>
        {/*navegación*/}
        <div className="">
          <nav className="grid p-4">
            <Link to="all-users" className="px-2 py-1 hover:bg-[#eb611f] text-sm">Usuarios</Link>
            <Link to="all-products" className="px-2 py-1 hover:bg-[#eb611f] text-sm">Productos</Link>
            <Link className="px-2 py-1 hover:bg-[#eb611f] text-sm">Ventas</Link>
          </nav>
        </div>
      </aside>
      <main className="w-full h-full p-2 bg-white"><Outlet /></main>
    </div>
  );
}
