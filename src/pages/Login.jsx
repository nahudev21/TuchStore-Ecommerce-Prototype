import { useState } from "react";
import loginIcon from "../assets/auth_icon.png";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Login() {

  const [ showPassword, setShowPassword ] = useState(false);  

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-4 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto ">
            <img src={loginIcon} alt="Login icon" />
          </div>

          <form className="">
            <div className="">
              <label>Usuario</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="Usuario"
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="my-2">
              <label>Contraseña</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((prevent) => !prevent)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <IoEyeSharp />}</span>
                </div>
              </div>
              <Link
                to="/forgot-password"
                className="block w-fit ml-auto hover:text-red-600"
              >
                Cambiar Contraseña
              </Link>
            </div>
            <button
              className="px-3 py-2 w-full text-white bg-[#eb611f] hover:bg-[#ff5100] hover:scale-[102%] 
              transition-all mx-auto mt-6 block"
            >
              Iniciar Sesión
            </button>
          </form>
          <p className="my-2">
            Todavia no tienes una cuenta?{" "}
            <Link
              to="/sign-up"
              className="text-[#4189e6d2] hover:text-[#4189e6]"
            >
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
