/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Item, PurchaseOrderData, Supplier } from "../../types";
import { axiosApi } from "../../../../api";
import { toast } from "react-toastify";

const CreateOrder = () => {
  const [orderData, setOrderData] = React.useState<PurchaseOrderData>({
    purchaseOrderTitle: "",
    deliveryDate: "",
    termsAndConditions: "",
    paymentType: "MPESA" || "PAYPAL",
    items: [],
    vendorId: "",
  });
  
  const [items, setItems] = React.useState<Item[]>([]);
  const [suppliers, setSuppliers] = React.useState<Supplier[]>([]);

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
    try {
      const response = await axiosApi.get("/suppliers");
      const suppliers = response.data;

      console.log("Suppliers:", suppliers);

      return suppliers;
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      throw error;
    }
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
    } else {
      setOrderData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const createOrder = async () => {
    const itemsArray = orderData.items.map((itemId) => ({ itemId }));
    const dataToSend = {
      ...orderData,
      items: itemsArray,
    };

    try {
      const response = await axiosApi.post("/purchase-order/create", dataToSend);

      const responseData = response.data;
      toast.success(response.data.message);
      setOrderData({
        purchaseOrderTitle: "",
        deliveryDate: "",
        termsAndConditions: "",
        paymentType: "MPESA" || "PAYPAL",
        items: [],
        vendorId: "",
      });
      console.log("Response from backend:", responseData);
    } catch (error) {
      toast.error("An error occured!");
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="py-16 max-w-7xl m-auto">
      <label className="block mb-2" htmlFor="purchaseOrderTitle">
        Purchase Order Title:
      </label>
      <input
        className="w-full border p-2 mb-4"
        type="text"
        id="purchaseOrderTitle"
        name="purchaseOrderTitle"
        value={orderData.purchaseOrderTitle}
        onChange={handleInputChange}
      />

      <label className="block mb-2" htmlFor="deliveryDate">
        Delivery Date:
      </label>
      <input
        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
        type="date"
        id="deliveryDate"
        name="deliveryDate"
        value={orderData.deliveryDate}
        onChange={handleInputChange}
      />

      <label className="block mb-2" htmlFor="termsAndConditions">
        Terms and Conditions:
      </label>
      <textarea
        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
        id="termsAndConditions"
        name="termsAndConditions"
        value={orderData.termsAndConditions}
        onChange={handleInputChange}
      />

      <label className="block mb-2" htmlFor="items">
        Select items:
      </label>
      <select
        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
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

      <label className="block mb-2" htmlFor="paymentType">
        Payment Type:
      </label>
      <select
        className="w-full border p-2 mb-4"
        id="paymentType"
        name="paymentType"
        value={orderData.paymentType}
        onChange={handleInputChange}
      >
        <option value="">Select Payment Type</option>
        <option value="MPESA">MPESA</option>
        <option value="PAYPAL">PAYPAL</option>
      </select>

      <label className="block mb-2" htmlFor="vendorId">
        Select Supplier:
      </label>
      <select
        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
        id="vendorId"
        name="vendorId"
        onChange={handleInputChange}
        value={orderData.vendorId}
      >
        <option value="">Select a supplier</option>
        {suppliers.map((supplier: any, i) => (
          <option key={i} value={supplier.vendorId}>
            {supplier.name}
          </option>
        ))}
      </select>

      <div className="pt-4 flex items-center space-x-4">
        <button
          onClick={createOrder}
          className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
        >
          Create Order
        </button>
      </div>
    </div>
  );
};

export default CreateOrder;
