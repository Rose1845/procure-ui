import React from "react";
import { PurchaseOrderData } from "../../types";

const CreateOrder = () => {
  const [orderData, setOrderData] = React.useState<PurchaseOrderData>({
    purchaseOrderTitle: "",
    deliveryDate: "",
    termsAndConditions: "",
    paymentType: "MPESA" || "PAYPAL",
    items: [],
    vendorId: 0,
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
    const response = await fetch("http://localhost:8081/api/v1/items");
    const items = await response.json();
    return items;
  };

  const fetchSuppliers = async () => {
    const response = await fetch("http://localhost:8081/api/v1/suppliers");
    const suppliers = await response.json();
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
      const response = await fetch(
        "http://localhost:8081/api/v1/purchase-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to create order: ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log("Response from backend:", responseData);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="py-16 max-w-2xl mx-auto">
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
        className="w-full border p-2 mb-4"
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
        className="w-full border p-2 mb-4"
        id="termsAndConditions"
        name="termsAndConditions"
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
        className="w-full border p-2 mb-4"
        id="vendorId"
        name="vendorId"
        onChange={handleInputChange}
        value={orderData.vendorId}
      >
        <option value="">Select a supplier</option>
        {suppliers.map((supplier: any) => (
          <option key={supplier.vendorId} value={supplier.vendorId}>
            {supplier.name}
          </option>
        ))}
      </select>

      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        onClick={createOrder}
      >
        Create Order
      </button>
    </div>
  );
};

export default CreateOrder;
