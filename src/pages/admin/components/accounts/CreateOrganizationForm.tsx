/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosApi } from "@/api";
import React from "react";
import { toast } from "react-toastify";

const CreateOrganizationForm = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    phoneNumber: "",
    address: {
      box: "",
      country: "",
      city: "",
      location: "",
    },
  });
  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    if (name.includes("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        address: { ...prevData.address, [addressField]: value },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axiosApi.post("/organization", formData);
      const ordg = response.data;
      if (ordg) {
        toast.success("created sucessfully!");
      }
      console.log(ordg, "organization");
    } catch (error) {
      toast.error("an error occured!");
    }
  };
  return (
    <div>
      <h2>Create Organization</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Organization Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
          />
        </div>

        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
            required
          />
        </div>

        <div>
          <label htmlFor="address.box">Box:</label>
          <input
            type="text"
            id="address.box"
            name="address.box"
            value={formData.address.box}
            onChange={handleChange}
            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
            required
          />
        </div>

        <div>
          <label htmlFor="address.country">Country:</label>
          <input
            type="text"
            id="address.country"
            name="address.country"
            value={formData.address.country}
            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="address.city">City:</label>
          <input
            type="text"
            id="address.city"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="address.location">Location:</label>
          <input
            type="text"
            id="address.location"
            name="address.location"
            value={formData.address.location}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Create Organization</button>
      </form>
    </div>
  );
};

export default CreateOrganizationForm;
