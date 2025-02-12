import { useEffect, useState } from "react";
import { getAllUsersRequest } from "../api/user";
import { MdModeEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import ChangeUserRol from "../components/ChangeUserRol";

export default function AllUsers() {

  const [ users, setUsers ] = useState([]);

  const [ openUpdateRoleModal, setOpenUpdateRoleModal ] = useState(false);

  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    firstName: "",
    roles: [],
  });

   const getUsers = async () => {
     const res = await getAllUsersRequest();
     setUsers(res.data);
   };

  useEffect(() => {
    getUsers();
  }, [])

  return (
    <div className="w-full bg-[#eb611f]">
      <h4 className="text-center text-[16px] text-white font-medium p-1">
        Lista de Usuarios
      </h4>

      <table className="w-full userTable">
        <thead>
          <tr className="">
            <th>#</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Fecha de registro</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users
            ? users?.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.roles.map((r) => {
                      return (
                        <span key={r} className="text-green-600 font-medium">
                          {r.name}
                        </span>
                      );
                    })}
                  </td>
                  <td>hoy</td>
                  <td>
                    <button
                      className="rounded-full text-[#4189e6b7] cursor-pointer p-2 text-[20px] hover:scale-[105%]"
                      onClick={() => {
                        setUpdateUserDetails(user);
                        setOpenUpdateRoleModal(true);
                      }}
                    >
                      <MdModeEdit />
                    </button>
                    <button className="rounded-full text-red-600 cursor-pointer p-2 text-[20px] hover:scale-[105%]">
                      <MdDeleteForever />
                    </button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
      {openUpdateRoleModal && (
        <ChangeUserRol
          onClose={() => setOpenUpdateRoleModal(false)}
          email={updateUserDetails.email}
          firstName={updateUserDetails.firstName}
          roles={updateUserDetails.roles}
          callFunc={getUsers}
        />
      )}
    </div>
  );
}
