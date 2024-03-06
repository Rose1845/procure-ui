import { axiosApi } from "@/api";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ChangePasswordForm = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmationPassword: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosApi.patch("/users", formData);
      const changePassword = response.data;
      if (changePassword) {
        toast.success("password changed successfully!");
      }
      toast.success("password changed successfully!");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmationPassword: "",
      });
    } catch (error) {
      toast.error("An error occured,try again later!");
      console.log(error);
    }
    console.log("Form Data:", formData);
  };

  return (
    <div>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-600"
            htmlFor="currentPassword"
          >
            Current Password:
          </label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-600"
            htmlFor="newPassword"
          >
            New Password:
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-600"
            htmlFor="confirmationPassword"
          >
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmationPassword"
            name="confirmationPassword"
            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
            value={formData.confirmationPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="pt-4 flex items-center space-x-4">
          <button
            type="submit"
            className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
          >
            Change Password{" "}
          </button>
        </div>{" "}
      </form>
    </div>
  );
};

export default ChangePasswordForm;
