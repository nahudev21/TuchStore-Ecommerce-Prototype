import { useState } from "react";
import Role from "../common/Rol";
import { IoMdClose } from "react-icons/io";
import { updateUserRoleRequest } from "../api/user";
import { toast } from "react-toastify";

export default function ChangeUserRol({ firstName, email, roles, onClose, callFunc }) {

  const [ userRoles, setUserRoles ] = useState(roles)

  console.log("ur", userRoles)

  const handleChangeSelect = (e) => {
    const newRole = e.target.value; // Valor del input

    // Actualizamos cada rol agregando el nuevo valor
    const updatedRoles = userRoles.map((r) => ({
      ...r,
      name: newRole, // Aquí asumes que cada objeto de rol tiene una propiedad 'role'
    }));

    setUserRoles(updatedRoles)
  }

  const handleClick = async () => {
    for (const role of userRoles) {
      const res = await updateUserRoleRequest(role.id, role.name);

      if (res.success) {
        toast.success(res.message);
        onClose();
        callFunc();
      }
    }
  };

  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50">
      <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm">
        <button
          className="block ml-auto text-gray-400 hover:text-black"
          onClick={onClose}
        >
          <IoMdClose />
        </button>
        <h1 className="pb-2 text-[20px] font-medium">
          Cambiar Rol del Usuario
        </h1>
        <p>Nombre: {firstName}</p>
        <p>Email: {email}</p>
        {userRoles.map((role) => (
          <div key={role.id} className="flex items-center my-4">
            {" "}
            <p>Rol:</p>
            <select
              value={role.name}
              className="border border-[#eb611f] mx-2 px-2 py-[1px] outline-none text-[15px] font-medium rounded-sm"
              onChange={handleChangeSelect}
            >
              {Object.values(Role).map((r) => {
                return (
                  <option value={r} key={r} className="text-[14px] font-medium">
                    {r}
                  </option>
                );
              })}
            </select>
          </div>
        ))}
        <button
          className="px-3 py-[2px] mx-auto block rounded-[15px] text-[15px] text-white bg-[#eb611f] hover:bg-[#ff5100] 
          hover:scale-[102%] transition-all"
          onClick={handleClick}
        >
          Cambiar Rol
        </button>
      </div>
    </div>
  );
}
