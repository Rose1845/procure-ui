import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {  FaPlus } from "react-icons/fa";
import useApi from "@/hooks/useApi";
import { User } from "../../types";

function ListUsers() {
  const { axiosApi } = useApi();
  const navigate = useNavigate()
  const [users, setUsers] = React.useState<User[]>([]);
  React.useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axiosApi.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // const handleEdit = (id: number) => {
  //   // Redirect or open a modal for editing based on the id
  //   navigate(`/dashboard/user/update_password/${id}`);
  //   console.log(`Editing user with ID: ${id}`);
  // };
   const handleAddRole = (id: number) => {
     // Redirect or open a modal for editing based on the id
     navigate(`/dashboard/user/add_role/${id}`);
     console.log(`Editing user with ID: ${id}`);
   };
  const handleRemoveRole = async (id: number) => {
    try {
      // Send a DELETE request to delete the user with the given ID
     navigate(`/dashboard/user/remove_role/${id}`);
      console.log(`user with ID ${id} deleted successfully`);

      // Refresh the list of users after deletion
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pt-16">
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-blue-600 text-white">
          <Link
            className="flex space-x-3"
            to={"/dashboard/add/new_user"}
          >
            <span className="flex justify-center items-centers space-x-3">
              {" "}
              <FaPlus />
              Add NEW USER
            </span>
          </Link>
        </button>
      </div>
      <div className="max-w-7xl mx-auto mr-11 pt-16 flex flex-col">
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400">
                  <th className="px-4 py-3">Namme</th>
                  <th className="px-4 py-3">Role </th>
                  <th className="px-4 py-3">Phone Number</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-500">
                {users.length == 0 ? (
                  <tr className="text-gray-700 dark:text-gray-400">
                    <td colSpan={5} className="px-4 py-3 text-center">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user, i) => (
                    <tr key={i}>
                      <td className="px-4 py-3">
                        <div className="flex users-center text-sm">
                          <div>
                            <p className="font-semibold">
                              {user.firstname}
                              {user.lastname}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {user.authorities.map((auth) => (
                          <div key={auth.authority}>{auth.authority}</div>
                        ))}
                      </td>

                      <td className="px-4 py-3 text-sm">{user.phoneNumber}</td>
                      <td className="px-4 py-3 text-sm">{user.email}</td>

                      <td className="px-4 py-3 text-sm">
                        {/* <button
                          className="text-blue-600 px-4 py-2 ring-2 hover:underline"
                          onClick={() => handleEdit(user.id)}
                        >
                          Edit
                          <FaEdit className="text-xl text-gray-900" />
                        </button> */}
                        <button
                          className="text-blue-600 px-4 py-2 ring-2 hover:underline"
                          onClick={() => handleAddRole(user.id)}
                        >
                          ADD ROLE TO USER
                        </button>
                        {" | "}
                        <button
                          className="text-red-600 px-4 py-2 ring-2 hover:underline"
                          onClick={() => handleRemoveRole(user.id)}
                        >
                          Remove Role
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListUsers;
