import React from "react";
import { axiosApi } from "../../../../api";
import { useParams } from "react-router-dom";

const UpdateSupplier= () => {
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
    paymentType: "",
    termsAndConditions: "",
  });

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

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
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

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    updateSupplier();
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
    <div className="container mx-auto mt-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-8 shadow-md rounded-md"
      >
        <h2 className="text-2xl font-semibold mb-6">Update Supplier</h2>

        {/* Company Information */}
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
            className="mt-1 p-2 border rounded-md w-full"
          />
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
            className="mt-1 p-2 border rounded-md w-full"
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
            className="mt-1 p-2 border rounded-md w-full"
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
            className="mt-1 p-2 border rounded-md w-full"
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
            className="mt-1 p-2 border rounded-md w-full"
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
            className="mt-1 p-2 border rounded-md w-full"
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
            className="mt-1 p-2 border rounded-md w-full"
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
            className="mt-1 p-2 border rounded-md w-full"
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
            className="mt-1 p-2 border rounded-md w-full"
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
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Create Supplier
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSupplier;
