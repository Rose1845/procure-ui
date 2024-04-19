import React from "react";
import { Item, PurchaseRequisitiontData } from "../../types";
import { toast } from "react-toastify";
import useApi from "@/hooks/useApi";

const CreateRequisition = () => {
  const { axiosApi } = useApi()

  const [orderData, setOrderData] = React.useState<PurchaseRequisitiontData>({
    requisitionTitle: "",
    dateNeeded: "",
    description: "",
    items: [],
  });

  const [items, setItems] = React.useState([]);
  const [selectedItemsDetails, setSelectedItemsDetails] = React.useState<
    Item[]
  >([]);

  React.useEffect(() => {
    fetchItems()
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  const fetchItems = async () => {
    const response = await axiosApi.get("/items");
    const items = response.data;
    return items;
  };

  const handleCheckboxChange = (itemId: string) => {
    const updatedItems = orderData.items.includes(itemId)
      ? orderData.items.filter((id) => id !== itemId)
      : [...orderData.items, itemId];

    setOrderData((prevData) => ({ ...prevData, items: updatedItems }));
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({ ...prevData, [name]: value }));
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
      toast.success("Requisition created successfully");
      setOrderData({
        requisitionTitle: "",
        dateNeeded: "",
        description: "",
        items: [],
      });
      console.log("Response from backend:", responseData);
    } catch (error) {
      toast.error("An error occurred!");
      console.error("Error creating order:", error);
    }
  };

  React.useEffect(() => {
    const fetchSelectedItemsDetails = async () => {
      const selectedItemsDetailsPromises = orderData.items.map(
        async (itemId) => {
          const response = await axiosApi.get(`/items/${itemId}`);
          return response.data;
        }
      );
      const details = await Promise.all(selectedItemsDetailsPromises);
      setSelectedItemsDetails(details);
    };

    fetchSelectedItemsDetails();
  }, [orderData.items]);

  return (
    <div className="max-w-7xl mx-auto pt-16 py-16">
      <div className="flex items-center space-x-5">
        <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
          i
        </div>
        <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
          <h2 className="leading-relaxed uppercase">Create Purchase Requisition </h2>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-16 py-16">
        <label className="block mb-2" htmlFor="purchaseOrderTitle">
          Purchase Requisition Title:
        </label>
        <input
          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
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
          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
          type="date"
          id="dateNeeded"
          name="dateNeeded"
          value={orderData.dateNeeded}
          onChange={handleInputChange}
        />

        <label className="block mb-2" htmlFor="termsAndConditions">
          Description
        </label>
        <input
          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
          id="description"
          name="description"
          value={orderData.description}
          onChange={handleInputChange}
        />

        <label className="block mb-2" htmlFor="items">
          Select items:
        </label>
        {items.map((item: Item, i) => (
          <div key={i} className="mb-2">
            <input
              type="checkbox"
              id={`itemCheckbox-${i}`}
              name="items"
              value={item.itemId}
              checked={orderData.items.includes(item.itemId)}
              onChange={() => handleCheckboxChange(item.itemId)}
            />
            <label htmlFor={`itemCheckbox-${i}`} className="ml-2">
              {item.itemName}
            </label>
          </div>
        ))}
        {selectedItemsDetails.length > 0 && (
          <div className="mt-4">
            <h2>Selected Items Details:</h2>
            <table className="w-full border p-2">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Item Number</th>
                  <th>Unit Price</th>
                  <th>TotalPrice</th>

                  {/* Add more columns as needed */}
                </tr>
              </thead>
              <tbody>
                {selectedItemsDetails.map((itemDetails: Item, index) => (
                  <tr key={index}>
                    <td>{itemDetails.itemName}</td>
                    <td>{itemDetails.quantity}</td>
                    <td>{itemDetails.itemNumber}</td>
                    <td>{itemDetails.unitPrice}</td>
                    <td>{itemDetails.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="pt-4 flex items-center space-x-4">
          <button
            onClick={createRequisition}
            className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
          >
            Create Purchase Requisition
          </button>
        </div>
      </div>
    </div>

  );
};

export default CreateRequisition;
