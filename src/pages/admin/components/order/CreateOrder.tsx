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
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [deliveyDateError, setDeliveyDateError] = React.useState<string>("");
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
      if (name === "deliveryDate" || name === "dueDate") {
        const deliveryDate = name === "deliveryDate" ? value : orderData.deliveryDate;

        const today = new Date();
        const deliveryDateObj = new Date(deliveryDate);

        if (deliveryDateObj < today && name === "deliveryDate") {
          setDeliveyDateError("Delivery date should be in the present or future.");
        } else {
          setDeliveyDateError("");
        }
        
      }
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const createOrder = async () => {
    if(!validateForm()){
      return
    }
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
  const validateForm = () => {
    let isValid = true;
    const newErrors: Record<string, string> = {};

    if (!orderData.purchaseOrderTitle) {
      newErrors.purchaseOrderTitle = "purchaseOrderTitle title is required";
      isValid = false;
    }
    if (!orderData.termsAndConditions) {
      newErrors.termsAndConditions = "Terms and conditions are required";
      isValid = false;
    }
   
    if (!orderData.deliveryDate) {
      newErrors.deliveryDate = "delivery Date are required";
      isValid = false;
    }
    
    if (orderData.items.length === 0) {
      newErrors.items = "At least one item must be selected";
      isValid = false;
    }

    if (orderData.vendorId) {
      newErrors.vendorId = "supplier must be selected";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  return (
    <div className="max-w-7xl mx-auto pt-16 py-16">
      <div className="flex items-center space-x-5">
        <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
          i
        </div>
        <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
          <h2 className="leading-relaxed uppercase">Create Purchase Order </h2>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-16">
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
        {errors.purchaseOrderTitle && (
          <p className="text-red-500">{errors.purchaseOrderTitle}</p>
        )}
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
        {deliveyDateError && <p className="text-red-500">{deliveyDateError}</p>}
        {errors.deliveryDate && (
          <p className="text-red-500">{errors.deliveryDate}</p>
        )}
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
        {errors.termsAndConditions && (
          <p className="text-red-500">{errors.termsAndConditions}</p>
        )}
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
        {errors.items && (
          <p className="text-red-500">{errors.items}</p>
        )}
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
        {errors.vendorId && (
          <p className="text-red-500">{errors.vendorId}</p>
        )}
        <div className="pt-4 flex items-center space-x-4">
          <button
            onClick={createOrder}
            className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
          >
            Create Order
          </button>
        </div>
      </div>
    </div>
  
  );
};

export default CreateOrder;
