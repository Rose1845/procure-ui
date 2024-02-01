import React from "react";
import { ContractData } from "../../types";
import { axiosApi } from "../../../../api";
import { useParams } from "react-router-dom";

const UpdateContract = () => {
  const { id } = useParams();
  const [contractData, setContractData] = React.useState<ContractData>({
    contractTitle: "",
    contractType: "",
    contractStartDate: "",
    contractEndDate: "",
    termsAndConditions: "",
    items: [],
    vendorId: 0,
  });

  const [items, setItems] = React.useState([]);
  const [suppliers, setSuppliers] = React.useState([]);

  React.useEffect(() => {
    // Fetch items from the API
    fetchItems()
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching items:", error));

    // Fetch suppliers from the API
    fetchSuppliers()
      .then((data) => setSuppliers(data))
      .catch((error) => console.error("Error fetching suppliers:", error));
    const fetchCategoryData = async () => {
      try {
        const response = await axiosApi.get(`/contract/${id}`);
        const contract = response.data;
        setContractData(contract);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchCategoryData();
  }, [id]);

  const fetchItems = async () => {
    const response = await axiosApi.get("/items");
    return response.data;
  };

  const fetchSuppliers = async () => {
    const response = await axiosApi.get("/suppliers");
    return response.data;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "items") {
      const selectElement = e.target as HTMLSelectElement;
      const selectedItems = Array.from(
        selectElement.selectedOptions,
        (option) => option.value
      );

      setContractData((prevData) => ({ ...prevData, items: selectedItems }));
    } else {
      setContractData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const UpdateContract = async () => {
    console.log(contractData, "test co");

    const itemsArray = contractData.items.map((itemId) => ({ itemId }));

    const dataToSend = {
      ...contractData,
      items: itemsArray,
    };

    try {
      const response = await axiosApi.put(`/contract/${id}`, dataToSend);

      if (!response.data) {
        throw new Error(`Failed to create contract: ${response.statusText}`);
      }

      console.log("Response from backend:", response.data);
    } catch (error) {
      console.error("Error creating contract:", error);
    }
  };

  return (
    <div className="py-16 max-w-2xl mx-auto">
      <label
        htmlFor="contractTitle"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Contract Title:
      </label>
      <input
        type="text"
        id="contractTitle"
        name="contractTitle"
        value={contractData.contractTitle}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
      />

      <label
        htmlFor="contractType"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Contract Type:
      </label>
      <input
        type="text"
        id="contractType"
        name="contractType"
        value={contractData.contractType}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
      />

      <label
        htmlFor="contractStartDate"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Contract Start Date:
      </label>
      <input
        type="date"
        id="contractStartDate"
        name="contractStartDate"
        value={contractData.contractStartDate}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
      />

      <label
        htmlFor="contractEndDate"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Contract End Date:
      </label>
      <input
        type="date"
        id="contractEndDate"
        name="contractEndDate"
        value={contractData.contractEndDate}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
      />

      <label
        htmlFor="termsAndConditions"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Terms and Conditions:
      </label>
      <textarea
        id="termsAndConditions"
        name="termsAndConditions"
        value={contractData.termsAndConditions}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
      />

      {/* Items dropdown */}
      <label
        htmlFor="items"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Select Items:
      </label>
      <select
        id="items"
        name="items"
        onChange={handleInputChange}
        value={contractData.items}
        multiple
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
      >
        {items.map((item: any, i) => (
          <option key={i} value={item.itemId}>
            {item.itemName}
          </option>
        ))}
      </select>

      {/* Suppliers dropdown */}
      <label
        htmlFor="vendorId"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Select Supplier:
      </label>
      <select
        className="w-full border p-2 mb-4"
        id="vendorId"
        name="vendorId"
        onChange={handleInputChange}
        value={contractData.vendorId}
      >
        <option value="">Select a supplier</option>
        {suppliers.map((supplier: any) => (
          <option key={supplier.vendorId} value={supplier.vendorId}>
            {supplier.name}
          </option>
        ))}
      </select>

      <button
        onClick={UpdateContract}
        className="bg-blue-500 mt-5 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
      >
        Create Contract
      </button>
    </div>
  );
};

export default UpdateContract;
