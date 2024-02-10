import React from "react";
import { PurchaseRequisitiontData } from "../../types";
import { axiosApi } from "../../../../api";
import { toast } from "react-toastify";

const CreateRequisition = () => {
  const [orderData, setOrderData] = React.useState<PurchaseRequisitiontData>({
    requisitionTitle: "",
    dateNeeded: "",
    description: "",
    items: [],
  });

  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetchItems()
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  const fetchItems = async () => {
    const response = await axiosApi.get("/items");
    const items = await response.data;
    return items;
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

  const createRequisition = async () => {
    const itemsArray = orderData.items.map((itemId) => ({ itemId }));
    const dataToSend = {
      ...orderData,
      items: itemsArray,
    };

    try {
      const response = await axiosApi.post("/purchase-requisition", dataToSend);

      const responseData = response.data;
      toast.success("Requisition created successfully")
      console.log("Response from backend:", responseData);
    } catch (error) {
      toast.error("An error occured!")
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="py-16 max-w-2xl mx-auto">
      <label className="block mb-2" htmlFor="purchaseOrderTitle">
        Purchase Request Title:
      </label>
      <input
        className="w-full border p-2 mb-4"
        type="text"
        id="requisitionTitle"
        name="requisitionTitle"
        value={orderData.requisitionTitle}
        onChange={handleInputChange}
      />

      <label className="block mb-2" htmlFor="deliveryDate">
        Date Needed:
      </label>
      <input
        className="w-full border p-2 mb-4"
        type="date"
        id="dateNeeded"
        name="dateNeeded"
        value={orderData.dateNeeded}
        onChange={handleInputChange}
      />

      <label className="block mb-2" htmlFor="termsAndConditions">
        Description
      </label>
      <textarea
        className="w-full border p-2 mb-4"
        id="description"
        name="description"
        value={orderData.description}
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
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        onClick={createRequisition}
      >
        Create Purchase Requisition
      </button>
    </div>
  );
};

export default CreateRequisition;
