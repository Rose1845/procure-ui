/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { axiosApi } from "../../../../api";
import { useParams } from "react-router-dom";

const UpdateSupplier = () => {
  const { id } = useParams();

  const [supplierData, setSupplierData] = React.useState({
    name: "",
    contactPerson: "",
    contactInformation: "",
    address: {
      box: "",
      country: "",
      city: "",
      location: "",
    },
    email: "",
    phoneNumber: "",
    paymentType: "MPESA" || "PAYPAL",
    termsAndConditions: "",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    const fetchSupplierData = async () => {
      try {
        const response = await axiosApi.get(`/suppliers/supplier/${id}`);
        const existingSupplierData = response.data;
        console.log(existingSupplierData, "id supllier");
        setSupplierData(existingSupplierData);
      } catch (error) {
        console.error(
          `Error fetching supplier with ID ${id} for editing:`,
          error
        );
      }
    };

    fetchSupplierData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      // Handle address fields separately
      const addressField = name.split(".")[1]; // Get the specific address field (box, country, city, location)
      setSupplierData({
        ...supplierData,
        address: {
          ...supplierData.address,
          [addressField]: value,
        },
      });
    } else {
      setSupplierData({
        ...supplierData,
        [name]: value,
      });
    }

    // Clear the error message for the input field being edited
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      updateSupplier();
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors: Record<string, string> = {};

    if (!supplierData.name) {
      newErrors.name = "Company Name is required";
      isValid = false;
    }
    if (!supplierData.contactPerson) {
      newErrors.contactPerson = "Contact Person is required";
      isValid = false;
    }
    if (!supplierData.contactInformation) {
      newErrors.contactInformation = "Contact Information is required";
      isValid = false;
    }
    if (!supplierData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }
    if (!supplierData.phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required";
      isValid = false;
    }
    if (!supplierData.termsAndConditions) {
      newErrors.termsAndConditions = "Terms and Conditions is required";
      isValid = false;
    }
    if (!supplierData.paymentType) {
      newErrors.paymentType = "Payment Type is required";
      isValid = false;
    }
    if (!supplierData.address.box) {
      newErrors.box = "P.O.BOX  is required";
      isValid = false;
    }
    if (!supplierData.address.city) {
      newErrors.city = "City  is required";
      isValid = false;
    }
    if (!supplierData.address.country) {
      newErrors.country = "Country  is required";
      isValid = false;
    }
    if (!supplierData.address.location) {
      newErrors.location = "Location  is required";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  

  const updateSupplier = async () => {
    try {
      const response = await axiosApi.put(`/suppliers/${id}`, supplierData);
      const updatedSupplierData = response.data;
      console.log(updatedSupplierData, "edit supplier");

      console.log(`Supplier with ID ${id} updated successfully`);
    } catch (error) {
      console.error(`Error updating supplier with ID ${id}:`, error);
    }
  };

  return (
    <div className="py-16 max-w-7xl  m-auto">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-6">Update Supplier</h2>
        {/* Company Information */}
        <div className="flex flex-row space-x-5">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Supplier Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={supplierData.name}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
            {errors.name && <div className="text-red-600">{errors.name}</div>}

          </div>

          <div className="mb-4">
            <label
              htmlFor="contactPerson"
              className="block text-sm font-medium text-gray-600"
            >
              Contact Person
            </label>
            <input
              type="text"
              id="contactPerson"
              name="contactPerson"
              value={supplierData.contactPerson}
              onChange={handleInputChange}
              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
            />
            {errors.contactPerson && <div className="text-red-600">{errors.contactPerson}</div>}

          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="contactInformation"
            className="block text-sm font-medium text-gray-600"
          >
            Contact Information
          </label>
          <input
            type="text"
            id="contactInformation"
            name="contactInformation"
            value={supplierData.contactInformation}
            onChange={handleInputChange}
            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
          />
          {errors.contactInformation && <div className="text-red-600">{errors.contactInformation}</div>}

        </div>

        <div className="mb-4">
          <label
            htmlFor="address.box"
            className="block text-sm font-medium text-gray-600"
          >
            Address Box
          </label>
          <input
            type="text"
            id="address.box"
            name="address.box"
            value={supplierData.address.box}
            onChange={handleInputChange}
            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
          />
          {errors.box && <div className="text-red-600">{errors.box}</div>}

        </div>

        <div className="mb-4">
          <label
            htmlFor="address.country"
            className="block text-sm font-medium text-gray-600"
          >
            Address Country
          </label>
          <input
            type="text"
            id="address.country"
            name="address.country"
            value={supplierData.address.country}
            onChange={handleInputChange}
            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
          />
          {errors.country && <div className="text-red-600">{errors.country}</div>}

        </div>

        <div className="mb-4">
          <label
            htmlFor="address.city"
            className="block text-sm font-medium text-gray-600"
          >
            Address City
          </label>
          <input
            type="text"
            id="address.city"
            name="address.city"
            value={supplierData.address.city}
            onChange={handleInputChange}
            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
          />
          {errors.city && <div className="text-red-600">{errors.city}</div>}
        </div>

        <div className="mb-4">
          <label
            htmlFor="address.location"
            className="block text-sm font-medium text-gray-600"
          >
            Address Location
          </label>
          <input
            type="text"
            id="address.location"
            name="address.location"
            value={supplierData.address.location}
            onChange={handleInputChange}
            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
          />
          {errors.location && <div className="text-red-600">{errors.location}</div>}

        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={supplierData.email}
            onChange={handleInputChange}
            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
          />
          {errors.email && <div className="text-red-600">{errors.email}</div>}

        </div>

        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-600"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={supplierData.phoneNumber}
            onChange={handleInputChange}
            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
          />
          {errors.phoneNumber && <div className="text-red-600">{errors.phoneNumber}</div>}

        </div>

        <div className="mb-4">
          <label
            htmlFor="paymentType"
            className="block text-sm font-medium text-gray-600"
          >
            Payment Type
          </label>
          <input
            type="text"
            id="paymentType"
            name="paymentType"
            value={supplierData.paymentType}
            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
          />
        </div>
        <div className="flex flex-col">
          <label 
            className="block text-sm font-medium text-gray-600"
>Payment Type</label>
          <select
            id="paymentType"
            name="paymentType"
            value={supplierData.paymentType}
            // onChange={handleInputChange}
            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
          >
            <option value="">Select Payment Type</option>
            <option value="MPESA">MPESA</option>
            <option value="PAYPAL">PAYPAL</option>
          </select>
          {errors.paymentType && <div className="text-red-600">{errors.paymentType}</div>}

        </div>

        <div className="mb-4">
          <label
            htmlFor="termsAndConditions"
            className="block text-sm font-medium text-gray-600"
          >
            Terms and Conditions
          </label>
          <input
            type="text"
            id="termsAndConditions"
            name="termsAndConditions"
            value={supplierData.termsAndConditions}
            onChange={handleInputChange}
            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Update Supplier
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSupplier;
