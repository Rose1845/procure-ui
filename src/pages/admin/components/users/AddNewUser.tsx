import React, { useState } from "react";
import useApi from "@/hooks/useApi";
import { Role } from "../../types";
import PhoneInput from "react-phone-number-input";
import "react-phone-input-2/lib/style.css";
interface NewUser {
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  phoneNumber: string // Use E164Number type
  roles: number[];
}

const AddNewUser: React.FC = () => {
  const { axiosApi } = useApi();
  const [formData, setFormData] = useState<NewUser>({
    email: "",
    password: "",
    username: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    roles: [],
  });

  const [roles, setRoles] = useState<Role[]>([]);

  React.useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axiosApi.get("/roles");
      setRoles(response.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const roleId = parseInt(e.target.value, 10);
    const isChecked = e.target.checked;
    setFormData((prevFormData) => ({
      ...prevFormData,
      roles: isChecked
        ? [...prevFormData.roles, roleId]
        : prevFormData.roles.filter((id) => id !== roleId),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(formData,"datat");
    
    e.preventDefault();
    try {
      const response = await axiosApi.post("/users/new", formData);
      console.log("User created:", response.data);
      // Handle success (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error("Error creating user:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="max-w-7xl flex flex-col mx-auto pt-16">
      <div>
        <h3>ADD NEW USER</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="text-sm mt-3 sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
          required
        />
        <PhoneInput
          className="text-sm mt-3 sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
          inputProps={{
            name: "phoneNumber",
            required: true,
            autoFocus: true,
          }}
          international
          defaultCountry="KE"
          placeholder="Enter phone number"
          onChange={(phoneNumber: string) =>
            setFormData((prevData) => ({ ...prevData, phoneNumber }))
          }
          value={formData.phoneNumber}
        />
        {/* 
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="phoneNumber"
          className="text-sm mt-3 sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
          required
        /> */}
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="text-sm mt-3 sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
          required
        />
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="text-sm mt-3 sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
          required
        />
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="text-sm mt-3 sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
          required
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="text-sm mt-3 sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
          required
        />
        <div>
          <label>Select Roles:</label>
          {roles.map((role) => (
            <div key={role.id}>
              <input
                type="checkbox"
                id={`role-${role.id}`}
                name={`role-${role.id}`}
                value={role.id}
                className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                checked={formData.roles.includes(role.id)}
                onChange={handleRoleChange}
              />
              <label htmlFor={`role-${role.id}`}>{role.name}</label>
            </div>
          ))}
        </div>
        <div>
          <button className="px-4 py-2 bg-blue-600 text-white" type="submit">
            Create User
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewUser;
