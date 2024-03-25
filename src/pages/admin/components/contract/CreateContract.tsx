import React from "react";
import { ContractData, Item, Supplier } from "../../types";
import { axiosApi } from "../../../../api";
import { toast } from "react-toastify";

const CreateContract = () => {
  const [contractData, setContractData] = React.useState<ContractData>({
    contractTitle: "",
    contractType: "",
    contractStartDate: "",
    contractEndDate: "",
    termsAndConditions: "",
    items: [],
    vendorId: "",
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
  }, []);

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

  const createContract = async () => {
    console.log(contractData, "test co");

    const itemsArray = contractData.items.map((itemId) => ({ itemId }));

    const dataToSend = {
      ...contractData,
      items: itemsArray,
    };

    try {
      const response = await axiosApi.post("/contract", dataToSend);

      if (!response.data) {
        throw new Error(`Failed to create contract: ${response.statusText}`);
      }
      toast.success("contract created successfully");
      setContractData({
        contractTitle: "",
        contractType: "",
        contractStartDate: "",
        contractEndDate: "",
        termsAndConditions: "",
        items: [],
        vendorId: "",
      });
      console.log("Response from backend:", response.data);
    } catch (error) {
      toast.error("An error occured!Please try again later  ");
      console.error("Error creating contract:", error);
    }
  };

  return (
    <div className="py-16">
      <div className="flex items-center space-x-5">
        <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
          i
        </div>
        <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
          <h2 className="leading-relaxed">Create Contract</h2>
        </div>
      </div>
      <div className=" max-w-7xl m-auto">
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
          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
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
          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
        />

        <div className="flex flex-col">
          <label className="leading-loose">Start Date</label>
          <div className="relative focus-within:text-gray-600 text-gray-400">
            <input
              type="date"
              id="contractStartDate"
              name="contractStartDate"
              value={contractData.contractStartDate}
              onChange={handleInputChange}
              className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
              placeholder="02/26/2020"
            />
            <div className="absolute left-3 top-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <label className="leading-loose">Due Date</label>
          <div className="relative focus-within:text-gray-600 text-gray-400">
            <input
              type="date"
              id="contractEndDate"
              name="contractEndDate"
              value={contractData.contractEndDate}
              onChange={handleInputChange}
              className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
              placeholder="02/26/2020"
            />
            <div className="absolute left-3 top-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <label
          htmlFor="termsAndConditions"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Terms and Conditions:
        </label>
        <input
          id="termsAndConditions"
          name="termsAndConditions"
          value={contractData.termsAndConditions}
          onChange={handleInputChange}
          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
        />

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
          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
        >
          {items.map((item: Item, i) => (
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
          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
          id="vendorId"
          name="vendorId"
          onChange={handleInputChange}
          value={contractData.vendorId}
        >
          <option value="">Select a supplier</option>
          {suppliers.map((supplier: Supplier) => (
            <option key={supplier.vendorId} value={supplier.vendorId}>
              {supplier.name}
            </option>
          ))}
        </select>

        <div className="pt-4 flex items-center space-x-4">
          <button
            onClick={createContract}
            className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
          >
            Create Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContract;
