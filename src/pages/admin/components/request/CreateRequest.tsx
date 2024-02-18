import React from "react";
import { axiosApi } from "../../../../api";
import { PurchaseRequestData } from "../../types";

const CreateRequest = () => {
  const [orderData, setOrderData] = React.useState<PurchaseRequestData>({
    purchaseRequestTitle: "",
    dueDate: "",
    termsAndConditions: "",
    items: [],
    suppliers: [], // Change vendorId to suppliers as an array
  });

  const [items, setItems] = React.useState([]);
  const [suppliers, setSuppliers] = React.useState([]);

  React.useEffect(() => {
    fetchItems()
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching items:", error));

    fetchSuppliers()
      .then((data) => setSuppliers(data))
      .catch((error) => console.error("Error fetching suppliers:", error));
  }, []);

  const fetchItems = async () => {
    const response = await axiosApi.get("/items");
    const items = response.data;
    return items;
  };

  const fetchSuppliers = async () => {
    const response = await axiosApi.get("/suppliers");
    const suppliers = response.data;
    return suppliers;
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
      setOrderData((prevData) => ({ ...prevData, items: selectedItems }));
    } else if (name === "suppliers") {
      const selectElement = e.target as HTMLSelectElement;
      const selectedSuppliers = Array.from(
        selectElement.selectedOptions,
        (option) => option.value
      );
      setOrderData((prevData) => ({
        ...prevData,
        suppliers: selectedSuppliers,
      }));
    } else {
      setOrderData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const createRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const itemsArray = orderData.items.map((itemId) => ({ itemId }));
    const dataToSend = {
      ...orderData,
      items: itemsArray,
    };

    try {
      const response = await axiosApi.post(
        "/purchase-request/create",
        dataToSend
      );
      const responseData = response.data;
      console.log("Response from backend:", responseData);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="py-16 max-w-7xl m-auto">
      <form onSubmit={createRequest} action="">
        <label className="block mb-2" htmlFor="purchaseRequestTitle">
          Purchase Request Title:
        </label>
        <input
          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
          type="text"
          id="purchaseRequestTitle"
          name="purchaseRequestTitle"
          value={orderData.purchaseRequestTitle}
          onChange={handleInputChange}
        />

        <label className="block mb-2" htmlFor="dueDate">
          Due Date:
        </label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
          value={orderData.dueDate}
          onChange={handleInputChange}
        />

        <label className="block mb-2" htmlFor="termsAndConditions">
          Terms and Conditions:
        </label>
        <input
          id="termsAndConditions"
          name="termsAndConditions"
          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
          value={orderData.termsAndConditions}
          onChange={handleInputChange}
        />

        <label className="block mb-2" htmlFor="items">
          Select items:
        </label>
        <select
          className="w-full border p-2 mb-4"
          id="items"
          name="items"
          onChange={handleInputChange}
          value={orderData.items}
          multiple
        >
          {items.map((item: any, i) => (
            <option key={i} value={item.itemId}>
              {item.itemName}
            </option>
          ))}
        </select>

        <label className="block mb-2" htmlFor="suppliers">
          Select Suppliers:
        </label>
        <select
          className="w-full border p-2 mb-4"
          id="suppliers"
          name="suppliers"
          onChange={handleInputChange}
          // value={orderData.suppliers}
          multiple
        >
          {suppliers.map((supplier: any) => (
            <option key={supplier.vendorId} value={supplier.vendorId}>
              {supplier.name}
            </option>
          ))}
        </select>

        <div className="pt-4 flex items-center space-x-4">
          <button className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">
            Create Purchase Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRequest;
