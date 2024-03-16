/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosApi } from '@/api';
import React from 'react'
import { toast } from 'react-toastify';

function CreateRole() {
    const [roleData,setRoleData] = React.useState({
        name:"",
        description:"",
        isDefault: true
    })
    const handleChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target;
        setRoleData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axiosApi.post("/roles/create", roleData);
            const role = response.data;
            if (role) {
                toast.success("password changed successfully!");
            }
            toast.success("password changed successfully!");
            setRoleData({
                name: "",
                description: "",
                isDefault: true
            });
        } catch (error) {
            toast.error("An error occured,try again later!");
            console.log(error);
        }
        console.log("Role Data:", roleData);
    };

  return (
      <div> <form onSubmit={handleSubmit}>
          <div className="mb-4">
              <label
                  className="block text-sm font-medium text-gray-600"
                  htmlFor="description"
              >
                  Description
              </label>
              <input
                  type="password"
                  id="description"
                  name="description"
                  value={roleData.description}
                  className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  onChange={handleChange}
                  required
              />
          </div>
          <div className="mb-4">
              <label
                  className="block text-sm font-medium text-gray-600"
                  htmlFor="name"
              >
                  Name:
              </label>
              <input
                  type="name"
                  id="name"
                  name="name"
                  className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  value={roleData.name}
                  onChange={handleChange}
                  required
              />
          </div>
          <div className="mb-4">
              <label
                  className="block text-sm font-medium text-gray-600"
                  htmlFor="confirmationPassword"
              >
                  IsDefault
              </label>
              {/* <input
                  type="password"
                  id="isDefault"
                  name="isDefault"
                  className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  value={roleData.isDefault}
                  onChange={handleChange}
                  required
              /> */}
          </div>
          <div className="pt-4 flex items-center space-x-4">
              <button
                  type="submit"
                  className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
              >
                 Create Role{" "}
              </button>
          </div>{" "}
      </form></div>
  )
}

export default CreateRole