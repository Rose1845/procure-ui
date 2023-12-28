import axios from "axios";
import React, { useState, useEffect } from "react";

const CreateContract = () => {
  const [contractData, setContractData] = useState({
    contractTitle: "",
    contractType: "",
    contractStartDate: "",
    contractEndDate: "",
    termsAndConditions: "",
    items: [{ itemId: "" }],
    vendorId: 0,
  });

  const [items, setItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    // Fetch items from the API
    fetchItems()
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching items:", error));

    // Fetch suppliers from the API
    fetchSuppliers()
      .then((data) => setSuppliers(data))
      .catch((error) => console.error("Error fetching suppliers:", error));
  }, []);

  const fetchItems = async () => {
    // Replace with your actual API endpoint for fetching items
    const response = await fetch("http://localhost:8081/api/v1/items");
    const items = await response.json();
    console.log(items);

    return items;
  };

  const fetchSuppliers = async () => {
    // Replace with your actual API endpoint for fetching suppliers
    const response = await fetch("http://localhost:8081/api/v1/suppliers");
    const suppliers = await response.json();
    console.log(suppliers);

    return suppliers;
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "items") {
      const items = contractData.items.map((item, index) =>
        index.toString() === value ? { ...item, itemId: value } : item
      );
      setContractData((prevData) => ({ ...prevData, items }));
    } else {
      setContractData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const createContract = async () => {
    console.log(contractData, "test co");

    try {
      const response = await fetch("http://localhost:8081/api/v1/contract", {
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
    <div className="py-16">
      <label htmlFor="contractTitle">Contract Title:</label>
      <input
        type="text"
        id="contractTitle"
        name="contractTitle"
        value={contractData.contractTitle}
        onChange={handleInputChange}
      />

      <label htmlFor="contractType">Contract Type:</label>
      <input
        type="text"
        id="contractType"
        name="contractType"
        value={contractData.contractType}
        onChange={handleInputChange}
      />

      <label htmlFor="contractStartDate">Contract Start Date:</label>
      <input
        type="date"
        id="contractStartDate"
        name="contractStartDate"
        value={contractData.contractStartDate}
        onChange={handleInputChange}
      />

      <label htmlFor="contractEndDate">Contract End Date:</label>
      <input
        type="date"
        id="contractEndDate"
        name="contractEndDate"
        value={contractData.contractEndDate}
        onChange={handleInputChange}
      />

      <label htmlFor="termsAndConditions">Terms and Conditions:</label>
      <textarea
        id="termsAndConditions"
        name="termsAndConditions"
        value={contractData.termsAndConditions}
        onChange={handleInputChange}
      />

      {/* Items dropdown */}
      <label htmlFor="items">Select Items:</label>
      <select
        id="items"
        name="items"
        onChange={handleInputChange}
        value={contractData.items[0].itemId}
      >
        <option value="">Select an item</option>
        {items.map((item: any) => (
          <option key={item.itemId} value={item.itemId}>
            {item.itemName} {/* Adjust property based on your item structure */}
          </option>
        ))}
      </select>

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

      <button onClick={createContract}>Create Contract</button>
    </div>
  );
};

export default CreateContract;
