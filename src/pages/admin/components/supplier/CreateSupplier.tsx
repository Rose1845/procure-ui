
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { SupplierData } from "../../types";
import { toast } from "react-toastify";
import useApi from "@/hooks/useApi";

function CreateSupplier() {
  const { axiosApi } = useApi()

  const [supplierData, setSupplierData] = useState<SupplierData>({
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
  const [errors, setErrors] = useState<Record<string, string>>({});

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
      createSupplier();
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

  const createSupplier = async () => {
    try {
      const response = await axiosApi.post("/suppliers", supplierData);
      const createdContract = response.data;
      toast.success("Supplier added successfully!");
      setSupplierData({
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
        paymentType: "MPESA",
        termsAndConditions: "",
      });
      console.log("Supplier created successfully:", createdContract);
    } catch (error: any) {
      if (error.response && error.response.data) {
        const { errorMessage, errors } = error.response.data;
        if (errors) {
          setErrors(errors);
        } else {
          toast.error(errorMessage);
        }
      } else {
        toast.error("Error occurred!");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto pt-16 py-16">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-6">Create Supplier</h2>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col space-y-3">
            <h3 className="font-bold text-xl">Company Details</h3>
            <div className="flex flex-col">
              <label className="leading-loose">Company Name</label>
              <div className="relative focus-within:text-gray-600 text-gray-400">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={supplierData.name}
                  onChange={handleInputChange}
                  className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                />
                {errors.name && <div className="text-red-600">{errors.name}</div>}
              </div>
            </div>
            <div className="flex flex-col">
              <label className="leading-loose">Contact Person</label>
              <div className="relative focus-within:text-gray-600 text-gray-400">
                <input
                  type="text"
                  id="contactPerson"
                  name="contactPerson"
                  value={supplierData.contactPerson}
                  onChange={handleInputChange}
                  className="px-4 py-2 border w-full focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                />
              </div>
              {errors.contactPerson && <div className="text-red-600">{errors.contactPerson}</div>}

            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={supplierData.email}
                onChange={handleInputChange}
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
              />
              {errors.email && <p className="text-red-600">{errors.email}</p>}

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
              {errors.phoneNumber && <p className="text-red-600">{errors.phoneNumber}</p>}
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
          </div>
          <div className="flex flex-col space-y-3">
            <h3 className="
        font-bold text-xl">Address Information</h3>
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
              {errors.box && <p className="text-red-600">{errors.box}</p>}

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
              {errors.city && <p className="text-red-600">{errors.city}</p>}
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
              {errors.location && <p className="text-red-600">{errors.location}</p>}

            </div>
          </div>
        </div>

        <div className="">
          <h3 className="
        font-bold text-xl">Other Details:</h3>
          <div className="flex flex-col">
            <label className="leading-loose">Payment Type</label>
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
            {errors.termsAndConditions && <p className="text-red-600">{errors.termsAndConditions}</p>}
          </div>
        </div>
        <div className="pt-4 flex items-center space-x-4">
          <button className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">
            Create Supplier
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateSupplier;
