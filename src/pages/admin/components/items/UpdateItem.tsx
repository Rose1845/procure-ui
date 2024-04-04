/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Category, ItemData } from "../../types";
import { axiosApi } from "../../../../api";
import { useParams } from "react-router-dom";

const UpdateItem = () => {
  const { id } = useParams();
  const [contractData, setContractData] = React.useState<ItemData>({
    itemName: "",
    itemNumber: "",
    itemDescription: "",
    quantity: 1,
    unitPrice: 0,
    categoryId: 0,
    // vendorId: "",
  });

  const [categories, setCategories] = React.useState<Category[]>([]);
  // const [suppliers, setSuppliers] = React.useState<Supplier[]>([]);

  React.useEffect(() => {
    fetchItems()
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));

    // fetchSuppliers()
    //   .then((data) => setSuppliers(data))
    //   .catch((error) => console.error("Error fetching suppliers:", error));
    const fetchItemData = async () => {
      try {
        const response = await axiosApi.get(`/items/${id}`);
        const item = response.data;
        setContractData(item);
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    fetchItemData();
  }, []);

  const fetchItems = async () => {
    const response = await axiosApi.get("/category");
    return response.data;
  };

  // const fetchSuppliers = async () => {
  //   const response = await axiosApi.get("/suppliers");
  //   return response.data;
  // };
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setContractData((prevData) => ({ ...prevData, [name]: value }));
  };

  const UpdateItem = async () => {
    try {
      const response = await axiosApi.put(`/items/${id}`, contractData);

      console.log("Item created successfully:", response.data);
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  return (
    <div className="py-16 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Edit Item</h1>

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
      </div>

      <div className="mb-4">
        <label
          htmlFor="itemDescription"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Item Description:
        </label>
        <textarea
          id="itemDescription"
          name="itemDescription"
          value={contractData.itemDescription}
          onChange={handleInputChange}
          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
        />
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
      </div>

      {/* <div className="mb-4">
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
      </div> */}
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
      </div>

      <div className="pt-4 flex items-center space-x-4">
        <button
          onClick={UpdateItem}
          className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
        >
          Update Item
        </button>
      </div>
    </div>
  );
};

export default UpdateItem;
