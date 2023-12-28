import axios from "axios";
import React, { useState, useEffect } from "react";

const CreateItem = () => {
  const [contractData, setContractData] = useState({
    itemName: "",
    itemNumber: "",
    contractStartDate: "",
    itemDescription: "",
    quantity: 0,
    unitPrice: 0,
    categoryId: 0,
    vendorId: 0,
  });

  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    // Fetch items from the API
    fetchItems()
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching cate:", error));

    // Fetch suppliers from the API
    fetchSuppliers()
      .then((data) => setSuppliers(data))
      .catch((error) => console.error("Error fetching suppliers:", error));
  }, []);

  const fetchItems = async () => {
    // Replace with your actual API endpoint for fetching items
    const response = await fetch("http://localhost:8081/api/v1/category");
    const category = await response.json();
    console.log(category,"categories")
    

    return category;
  };

  const fetchSuppliers = async () => {
    // Replace with your actual API endpoint for fetching suppliers
    const response = await fetch("http://localhost:8081/api/v1/suppliers");
    const suppliers = await response.json();
    console.log(suppliers);

    return suppliers;
  };

  const handleInputChange = (e: any) => {
     const {name,value} = e.target
      setContractData((prevData) => ({ ...prevData, [name]: value }));
    
  };

  const CreateItem = async () => {
    console.log(contractData,"test data");
    
    try {
      const response = await fetch("http://localhost:8081/api/v1/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contractData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create contract: ${response.statusText}`);
      }

      const createdContract = await response.json();
      console.log("Contract created successfully:", createdContract);
    } catch (error) {
      console.error("Error creating contract:", error);
    }
  };
  return (
    <div>
      <label htmlFor="contractTitle">itemName:</label>
      <input
        type="text"
        id="itemName"
        name="itemName"
        value={contractData.itemName}
        onChange={handleInputChange}
      />

      <label htmlFor="contractType">itemDescription:</label>
      <input
        type="text"
        id="itemDescription"
        name="itemDescription"
        value={contractData.itemDescription}
        onChange={handleInputChange}
      />

      <label htmlFor="contractStartDate">quantity</label>
      <input
        type="number"
        id="quantity"
        name="quantity"
        value={contractData.quantity}
        onChange={handleInputChange}
      />

      <label htmlFor="contractEndDate">unitPrice</label>
      <input
        type="number"
        id="unitPrice"
        name="unitPrice"
        value={contractData.unitPrice}
        onChange={handleInputChange}
      />

      <label htmlFor="itemNumber">itemNumber:</label>
      <textarea
        id="itemNumber"
        name="itemNumber"
        value={contractData.itemNumber}
        onChange={handleInputChange}
      />

      {/* Items dropdown */}

      {/* Suppliers dropdown */}
      <label htmlFor="vendorId">Select Supplier:</label>
      <select
        id="vendorId"
        name="vendorId"
        onChange={handleInputChange}
        value={contractData.vendorId}
      >
        <option value="">Select a supplier</option>
        {suppliers.map((supplier: any) => (
          <option key={supplier.vendorId} value={supplier.vendorId}>
            {supplier.name}{" "}
            {/* Adjust property based on your supplier structure */}
          </option>
        ))}
      </select>
      <label htmlFor="categoryId">Select Category:</label>
      <select
        id="categoryId"
        name="categoryId"
        onChange={handleInputChange}
        value={contractData.categoryId}
      >
        <option value="">Select a category</option>
        {categories.map((category: any) => (
          <option key={category.categoryId} value={category.categoryId}>
            {category.categoryName}{" "}
          </option>
        ))}
      </select>

      <button onClick={CreateItem}>Create Contract</button>
    </div>
  );
};

export default CreateItem;
