import React from "react";
import { axiosApi } from "../../../../api";
import { SupplierData } from "../../types";
import { toast } from "react-toastify";

function CreateSupplier() {
  const [supplierData, setSupplierData] = React.useState<SupplierData>({
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
    paymentType: "",
    termsAndConditions: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setSupplierData({
        ...supplierData,
        [parent]: {
          ...supplierData[parent],
          [child]: value,
        },
      });
    } else {
      setSupplierData({
        ...supplierData,
        [name]: value,
      });
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createSupplier();
  };

  const createSupplier = async () => {
    console.log(supplierData, "test data");

    try {
      const response = await axiosApi.post("/suppliers", supplierData);

      const createdContract = response.data;
      toast.success("supplier added succesfuly!");
      console.log("Supplier created successfully:", createdContract);
    } catch (error) {
      toast.error("error occured!");
      console.error("Error creating contract:", error);
    }
  };

  return (
    <div className="py-16 max-w-7xl m-auto">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-6">Create Supplier</h2>
        <div className="flex items-center space-x-6">
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
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
              />
            </div>
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
            onChange={handleInputChange}
            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
          />
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
