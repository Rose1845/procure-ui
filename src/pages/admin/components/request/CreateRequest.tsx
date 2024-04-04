/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import { toast } from "react-toastify";
import { axiosApi } from "@/api";
import { PurchaseRequestData } from "../../types";

const CreateRequest = () => {
  const [orderData, setOrderData] = React.useState<PurchaseRequestData>({
    purchaseRequestTitle: "",
    deliveryDate: "",
    dueDate: "",
    termsAndConditions: "",
    items: [],
    suppliers: [],
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [deliveyDateError, setDeliveyDateError] = React.useState<string>("");
  const [dueDateError, setDueDateError] = React.useState<string>("")
  const [items, setItems] = React.useState([]);
  const [suppliers, setSuppliers] = React.useState([]);
  React.useEffect(() => {
    const controller = new AbortController();

    fetchItems()
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching items:", error));

    fetchSuppliers()
      .then((data) => setSuppliers(data))
      .catch((error) => console.error("Error fetching suppliers:", error));
    return () => {
      controller.abort();
    };
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
    if (name === "items" || name === "suppliers") {
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
        const dueDate = name === "dueDate" ? value : orderData.dueDate;

        const today = new Date();
        const deliveryDateObj = new Date(deliveryDate);

        const dueDateObj = new Date(dueDate);


        if (deliveryDateObj < today && name === "deliveryDate") {
          setDeliveyDateError("Delivery date should be in the present or future.");
        } else {
          setDeliveyDateError("");
        }
        if (dueDateObj < today && name === "dueDate") {
          setDueDateError("Due date should be in the present or future.");
        } else {
          setDueDateError("");
        }
      }
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
      setOrderData((prevData) => ({ ...prevData, [name]: value }));
    }
  }

  // const handleInputChange1 = (
  //   e: React.ChangeEvent<
  //     HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  //   >
  // ) => {
  //   const { name, value } = e.target;
  //   if (name === "suppliers") {
  //     const selectElement = e.target as HTMLSelectElement;
  //     const selectedSuppliers = Array.from(
  //       selectElement.selectedOptions,
  //       (option) => option.value
  //     );
  //     setOrderData((prevData) => ({
  //       ...prevData,
  //       suppliers: selectedSuppliers,
  //     }));
  //   } else {
  //     setOrderData((prevData) => ({ ...prevData, [name]: value }));
  //   }
  // };

  const createRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    setIsLoading(true);


    const itemsArray = orderData.items.map((itemId) => ({ itemId }));
    const supplierArray = orderData.suppliers.map((vendorId) => ({ vendorId }));
    const dataToSend = {
      ...orderData,
      items: itemsArray,
      suppliers: supplierArray,
    };

    try {
      const response = await axiosApi.post(
        "/purchase-request/create",
        dataToSend
      );
      const responseData = response.data;
      toast.success("Success");
      console.log("Response from backend:", responseData);
    } catch (error: any) {
      toast.error(error.message);
      console.error("Error creating order:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const validateForm = () => {
    let isValid = true;
    const newErrors: Record<string, string> = {};

    if (!orderData.purchaseRequestTitle) {
      newErrors.purchaseRequestTitle = "purchaseRequest title is required";
      isValid = false;
    }
    if (!orderData.termsAndConditions) {
      newErrors.termsAndConditions = "Terms and conditions are required";
      isValid = false;
    }
    if (!orderData.dueDate) {
      newErrors.dueDate = "Due Date are required";
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
    
    if (orderData.suppliers.length === 0) {
      newErrors.suppliers = "At least one supplier must be selected";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
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
        {errors.purchaseRequestTitle && (
          <p className="text-red-500">{errors.purchaseRequestTitle}</p>
        )}

        <label className="block mb-2" htmlFor="deliveryDate">
          Delivery Date:
        </label>
        <input
          type="date"
          id="deliveryDate"
          name="deliveryDate"
          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
          value={orderData.deliveryDate}
          onChange={handleInputChange}
        />
        {deliveyDateError && <p className="text-red-500">{deliveyDateError}</p>}
        {errors.deliveryDate && (
          <p className="text-red-500">{errors.deliveryDate}</p>
        )}
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
        {dueDateError && <p className="text-red-500">{dueDateError}</p>}
        {errors.dueDate && (
          <p className="text-red-500">{errors.dueDate}</p>
        )}
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
        {errors.termsAndConditions && (
          <p className="text-red-500">{errors.termsAndConditions}</p>
        )}

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
        {errors.items && (
          <p className="text-red-500">{errors.items}</p>
        )}
        <label className="block mb-2" htmlFor="suppliers">
          Select Suppliers:
        </label>
        <select
          className="w-full border p-2 mb-4"
          id="suppliers"
          name="suppliers"
          onChange={handleInputChange}
          value={orderData.suppliers}
          multiple
        >
          {suppliers.map((supplier: any) => (
            <option key={supplier.vendorId} value={supplier.vendorId}>
              {supplier.name}
            </option>
          ))}
        </select>
        {errors.suppliers && (
          <p className="text-red-500">{errors.suppliers}</p>
        )}
        <div className="pt-4 flex items-center space-x-4">
          <button
            disabled={isLoading}
            type="submit"
            className={`bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none ${isLoading ? "bg-opacity-45 bg-red-900 cursor-not-allowed" : ""
              }`}
          >
            Create Purchase Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRequest;