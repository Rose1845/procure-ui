import React from "react";
import axios from "axios";
import { Category, ItemData, Supplier } from "../../types";

const CreateItem = () => {
  const [contractData, setContractData] = React.useState<ItemData>({
    itemName: "",
    itemNumber: "",
    itemDescription: "",
    quantity: 1,
    unitPrice: 0,
    categoryId: 0,
    vendorId: 0,
  });

  const [categories, setCategories] = React.useState<Category[]>([]);
  const [suppliers, setSuppliers] = React.useState<Supplier[]>([]);

  React.useEffect(() => {
    fetchItems()
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));

    fetchSuppliers()
      .then((data) => setSuppliers(data))
      .catch((error) => console.error("Error fetching suppliers:", error));
  }, []);

  const fetchItems = async () => {
    const response = await axios.get("http://localhost:8081/api/v1/category");
    return response.data;
  };

  const fetchSuppliers = async () => {
    const response = await axios.get("http://localhost:8081/api/v1/suppliers");
    return response.data;
  };

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setContractData((prevData) => ({ ...prevData, [name]: value }));
  };

  const createItem = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/v1/items",
        contractData
      );

      console.log("Item created successfully:", response.data);
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  return (
    <div className="py-16 max-w-2xl mx-auto">
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
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
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
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
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
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
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
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
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
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
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
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
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
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="">Select a category</option>
          {categories.map((category,i) => (
            <option key={i} value={category.categoryId}>
              {category.categoryName}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={createItem}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
      >
        Create Item
      </button>
    </div>
  );
};

export default CreateItem;
