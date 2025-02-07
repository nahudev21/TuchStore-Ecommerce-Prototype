import { useState } from "react";
import loginIcon from "../assets/auth_icon.png";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Login() {

  const [ showPassword, setShowPassword ] = useState(false);  

  const [ formData, setFormData ] = useState({
    email: "",
    password: ""
  }) 

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    });

  };

  const handleSubmit = (e) => {
    e.preventDefault();
  } 

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-4 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto ">
            <img src={loginIcon} alt="Login icon" />
          </div>

          <form className="" onSubmit={handleSubmit}>
            <div className="">
              <label>Usuario</label>
              <div className="bg-slate-100 p-2">
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Usuario"
                  className="w-full h-full outline-none bg-transparent"
                  required
                />
              </div>
            </div>
            <div className="my-2">
              <label>Contraseña</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  className="w-full h-full outline-none bg-transparent"
                  required
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
            Todavía no tienes una cuenta?{" "}
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
