import { useState } from "react";
import loginIcon from "../assets/auth_icon.png";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function SignUp() {
  
    const [ showPassword, setShowPassword ] = useState(false);  
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
  
    const [ formData, setFormData ] = useState({
      name: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
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
      <section id="signup">
        <div className="mx-auto container p-4">
          <div className="bg-white p-4 w-full max-w-sm mx-auto">
            <div className="w-20 h-20 mx-auto ">
              <img src={loginIcon} alt="Login icon" />
            </div>

            <form className="" onSubmit={handleSubmit}>
              <div className="">
                <label>Nombre</label>
                <div className="bg-slate-100 p-2">
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Nombre"
                    className="w-full h-full outline-none bg-transparent"
                    required
                  />
                </div>
              </div>
              <div className="my-2">
                <label>Apellido</label>
                <div className="bg-slate-100 p-2">
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    type="text"
                    placeholder="Apellido"
                    className="w-full h-full outline-none bg-transparent"
                    required
                  />
                </div>
              </div>
              <div className="my-2">
                <label>Email</label>
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
                    <span>
                      {showPassword ? <FaEyeSlash /> : <IoEyeSharp />}
                    </span>
                  </div>
                </div>
              </div>
              <div className="my-2">
                <label>Confirmar contraseña</label>
                <div className="bg-slate-100 p-2 flex">
                  <input
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirmar contraseña"
                    className="w-full h-full outline-none bg-transparent"
                    required
                  />
                  <div
                    className="cursor-pointer text-xl"
                    onClick={() =>
                      setShowConfirmPassword((prevent) => !prevent)
                    }
                  >
                    <span>
                      {showConfirmPassword ? <FaEyeSlash /> : <IoEyeSharp />}
                    </span>
                  </div>
                </div>
              </div>
              <button
                className="px-3 py-2 w-full text-white bg-[#eb611f] hover:bg-[#ff5100] hover:scale-[102%] 
                transition-all mx-auto mt-6 block"
              >
                Registrarse
              </button>
            </form>
            <p className="my-2">
              Ya tienes una cuenta?{" "}
              <Link
                to="/login"
                className="text-[#4189e6d2] hover:text-[#4189e6]"
              >
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </section>
    );
}
