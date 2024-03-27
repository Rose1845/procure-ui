/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Category, ItemData, Supplier } from "../../types";
import { axiosApi } from "../../../../api";
import { toast } from "react-toastify";

const CreateItem = () => {
  const [contractData, setContractData] = React.useState<ItemData>({
    itemName: "",
    itemNumber: "",
    itemDescription: "",
    quantity: 1,
    unitPrice: 0,
    categoryId: 0,
    vendorId: "",
  });
  
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [suppliers, setSuppliers] = React.useState<Supplier[]>([]);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  React.useEffect(() => {
    fetchItems()
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));

    fetchSuppliers()
      .then((data) => setSuppliers(data))
      .catch((error) => console.error("Error fetching suppliers:", error));
  }, []);

  const fetchItems = async () => {
    const response = await axiosApi.get("/category");
    return response.data;
  };

  const fetchSuppliers = async () => {
    const response = await axiosApi.get("/suppliers");
    return response.data;
  };

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setContractData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateFields = () => {
    const { itemName, itemNumber, itemDescription, unitPrice, quantity } = contractData;
    const errors: { [key: string]: string } = {};

    if (!itemName.trim()) {
      errors.itemName = "Item Name is required";
    }
    if (!itemNumber.trim()) {
      errors.itemNumber = "Item Number is required";
    }
    if (!itemDescription.trim()) {
      errors.itemDescription = "Item Description is required";
    }
    if (unitPrice == 0) {
      errors.unitPrice = "Unit Price must be greater than zero";
    }
    if (quantity < 1) {
      errors.quantity = "minimum quantity required is 1";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const createItem = async () => {
    if (!validateFields()) {
      return;
    }

    try {
      const response = await axiosApi.post("/items/create", contractData);
      if (!response.data) {
        toast.error("Please try again later");
      } else {
        toast.success("Item created successfully");
        console.log("Item created successfully:", response.data);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        const { errors } = error.response.data;
        Object.keys(errors).forEach((key) => {
          setErrors((prevErrors) => ({ ...prevErrors, [key]: errors[key] }));
        });
      } else {
        toast.error("An error occurred!");
        console.error("Error creating item:", error);
      }
    }
  };
  return (
    <div className="py-16 mr-11 max-w-7xl m-auto">
      <h1 className="text-2xl font-bold mb-8">Create Item</h1>

      <div className="mb-4">
        <label
          htmlFor="itemName"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Item Name:
        </label>
        <input
          type="text"
          id="itemName"
          name="itemName"
          value={contractData.itemName}
          onChange={handleInputChange}
          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
        />
        {errors.itemName && (
          <p className="text-red-500 text-sm mt-1">{errors.itemName}</p>
        )}
      </div>

      <div className="flex flex-col">
        <label className="leading-loose"> Item Description:</label>
        <input
          type="text"
          id="itemDescription"
          name="itemDescription"
          value={contractData.itemDescription}
          onChange={handleInputChange}
          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
          placeholder="Optional"
        />
        {errors.itemDescription && (
          <p className="text-red-500 text-sm mt-1">{errors.itemDescription}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="quantity"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Quantity:
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={contractData.quantity}
          onChange={handleInputChange}
          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
        />
        {errors.quantity && (
          <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="unitPrice"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Unit Price:
        </label>
        <input
          type="number"
          id="unitPrice"
          name="unitPrice"
          value={contractData.unitPrice}
          onChange={handleInputChange}
          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
        />
        {errors.unitPrice && (
          <p className="text-red-500 text-sm mt-1">{errors.unitPrice}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="itemNumber"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Item Number:
        </label>
        <input
          type="text"
          id="itemNumber"
          name="itemNumber"
          value={contractData.itemNumber}
          onChange={handleInputChange}
          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
        />
        {errors.itemNumber && (
          <p className="text-red-500 text-sm mt-1">{errors.itemNumber}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="vendorId"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Select Supplier:
        </label>
        <select
          id="vendorId"
          name="vendorId"
          onChange={handleInputChange}
          value={contractData.vendorId}
          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
        >
          <option value="">Select a supplier</option>
          {suppliers.map((supplier) => (
            <option key={supplier.vendorId} value={supplier.vendorId}>
              {supplier.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="categoryId"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Select Category:
        </label>
        <select
          id="categoryId"
          name="categoryId"
          onChange={handleInputChange}
          value={contractData.categoryId}
          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
        >
          <option value="">Select a category</option>
          {categories.map((category, i) => (
            <option key={i} value={category.categoryId}>
              {category.categoryName}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>
        )}
      </div>

      <div className="pt-4 flex items-center space-x-4">
        <button
          onClick={createItem}
          className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
        >
          Create Item
        </button>
      </div>
    </div>
  );
};

export default CreateItem;
