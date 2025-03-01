import { API_URL } from "./config";

export const getAllUsersRequest = async () => {
    try {
        const response = await fetch(`${API_URL}/users/all`, {
          method: "GET",
          headers: { "Content-type": "Application/json" },
        });
        if (response.ok) {
          const json = await response.json();
          console.log(json.data)
          return { success: true, data: json.data };
        } else {
          if (response.status === 401) {
            return { success: false, message: "Token incorrecto!" };
          }
        }
    } catch (error) {
        console.log("Error de red o de conexión:", error);
        return { message: "Error de red o de conexión" };
    }
}

export const updateUserRequest = async (id, user) => {

  const userUpdated = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    password: user?.password,
    roles: user.roles.map((r) => r.name)
  };

  try {
    const response = await fetch(`${API_URL}/users/${id}/update`, {
      method: "PUT",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(userUpdated),
    });
    if (response.ok) {
      const json = await response.json();
      console.log(json.data);
      return {
        success: true,
        data: json.data,
        message: "Usuario actualizado con éxito!",
      };
    } else {
      if (response.status === 401) {
        return { success: false, message: "Token incorrecto!" };
      }
    }
  } catch (error) {
    console.log("Error de red o de conexión:", error);
    return { message: "Error de red o de conexión" };
  }
};


export const updateUserRoleRequest = async (roleId, role) => {

  const roleMapper = {
    role: role
  }

  try {
    const response = await fetch(`${API_URL}/users/${roleId}/update-role`, {
      method: "PUT",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(roleMapper)
    });
    if (response.ok) {
      const json = await response.json();
      console.log(json);
      return { success: true, data: json.data, message: "Rol actualizado con éxito!" };
    } else {
      if (response.status === 401) {
        return { success: false, message: "Token incorrecto!" };
      }
    }
  } catch (error) {
    console.log("Error de red o de conexión:", error);
    return { message: "Error de red o de conexión" };
  }
};