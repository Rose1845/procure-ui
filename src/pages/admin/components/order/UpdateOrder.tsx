import React from "react";
import { Item, PurchaseOrderData } from "../../types";
import { axiosApi } from "../../../../api";
import { useParams } from "react-router-dom";

const UpdateOrder = () => {
  const { id } = useParams();
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
    const fetchOrderData = async () => {
      try {
        const response = await axiosApi.get(
          `/purchase-order/order-items/${id}`
        );
        const updatedOrder = response.data;
        setOrderData(updatedOrder);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };
    fetchOrderData();
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
    } else {
      setOrderData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const UpdateOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const itemsArray = orderData.items.map((itemId) => ({ itemId }));
    const dataToSend = {
      ...orderData,
      items: itemsArray,
    };

    try {
      const response = await axiosApi.put(`/purchase-order/${id}`, dataToSend);
      const responseData = response.data;
      console.log("Response from backend:", responseData);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="py-16 max-w-7xl m-auto">
      <div className="flex items-center space-x-5">
        <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
          i
        </div>
        <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
          <h2 className="leading-relaxed">Update Order</h2>
        </div>
      </div>{" "}
      <form onSubmit={UpdateOrder}>
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
          {items.map((item: Item, i) => (
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

        <div className="pt-4 flex items-center space-x-4">
          <button className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">
            Update Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateOrder;
