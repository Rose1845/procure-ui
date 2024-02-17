import React from "react";
import { axiosApi } from "../../../../api";
import { useParams } from "react-router-dom";
import { DeliveryDTo, PurchaseOrder, PurchaseOrderData } from "../../types";
import { toast } from "react-toastify";

function CreateDelivery() {
  const { id } = useParams();
  const [order, setOrder] = React.useState<PurchaseOrder>();
  React.useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axiosApi.get(
          `/purchase-order/get/order-items/${id}`
        );
        const categoryData = response.data;
        setOrder(categoryData);
        console.log("order retrived successfully");
      } catch (error) {
        console.error("Error updating order:", error);
      }
    };
    fetchCategory();
  }, [id]);

  const [formData, setFormData] = React.useState<DeliveryDTo>({
    deliveryDate: "",
    receivedBy: "",
    itemDToSet: [],
    deliveredOn: "",
    expectedOn: "",
    receivedOn: "",
  });

  React.useEffect(() => {
    if (order?.items) {
      setFormData((prevData) => ({
        ...prevData,
        itemDToSet: order.items.map((item) => ({
          itemId: item.itemId,
          quantityDelivered: 0,
          quantityReceived: 0,
        })),
      }));
    }
  }, [order?.items]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleItemChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;

    const [property, itemIndex] = name.split("-");

    setFormData((prevData) => ({
      ...prevData,
      itemDToSet: prevData.itemDToSet.map((item, i) =>
        i === index ? { ...item, [property]: value } : item
      ),
    }));
  };

  const addItem = () => {
    setFormData((prevData) => ({
      ...prevData,
      itemDToSet: [
        ...prevData.itemDToSet,
        {
          itemId: "",
          quantityDelivered: 0,
          quantityReceived: 0,
        },
      ],
    }));
  };

  const removeItem = (index: number) => {
    setFormData((prevData) => ({
      ...prevData,
      itemDToSet: prevData.itemDToSet.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const deliveredOnDate = new Date(formData.deliveredOn);
      const expectedOnDate = new Date(formData.expectedOn);
      const receivedOnDate = new Date(formData.receivedOn);

      // Convert the dates to strings in ISO format
      const deliveredOnISO = deliveredOnDate.toISOString();
      const expectedOnISO = expectedOnDate.toISOString();
      const receivedOnISO = receivedOnDate.toISOString();

      // Create your invoice object with the date properties
      const newInvoice = {
        receivedBy: formData.receivedBy,
        deliveredOn: deliveredOnISO,
        expectedOn: expectedOnISO,
        itemDToSet: formData.itemDToSet,
        receivedOn: receivedOnISO,
      };
      const response = await axiosApi.post(
        `/deliveries/${id}/deliveries`,
        newInvoice
      );
      if (!response.data) {
        toast.error("error coocured");
      }
      toast.success("contract created succesfully");
      setFormData({
        deliveryDate: "",
        receivedBy: "",
        itemDToSet: [],
        deliveredOn: "",
        expectedOn: "",
        receivedOn: "",
      });
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error("an error occured");
    }
    console.log("Form data submitted:", formData);
  };

  return (
    <div className="container flex flex-col justify-center items-center mx-auto mt-8 py-16">
      <div>
        <td className="px-4 py-3 text-xs">
          <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">
            {order?.approvalStatus}
          </span>
        </td>
        <h2>Order Name: {order?.purchaseOrderTitle}</h2>
        <h2>CreatedOn:</h2>
        <h2>Order PaymentType: {order?.paymentType}</h2>
        <h2>Expires On: {order?.deliveryDate}</h2>
      </div>
      <div>
        Contract Terms and Condition:
        {order?.termsAndConditions}
      </div>
      <form
        onSubmit={handleSubmit}
        className="container flex flex-col justify-center items-center mx-auto mt-8 py-16"
      >
        <div className="flex flex-col">
          <label htmlFor="deliveryDate">Delivery Date:</label>
          <input
            type="date"
            id="deliveryDate"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="receivedBy">Received By:</label>
          <input
            type="text"
            id="receivedBy"
            name="receivedBy"
            value={formData.receivedBy}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="deliveredOn">Delivered On:</label>
          <input
            type="date"
            id="deliveredOn"
            name="deliveredOn"
            value={formData.deliveredOn}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="expectedOn">Expected On:</label>
          <input
            type="date"
            id="expectedOn"
            name="expectedOn"
            value={formData.expectedOn}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="receivedOn">Received On:</label>
          <input
            type="date"
            id="receivedOn"
            name="receivedOn"
            value={formData.receivedOn}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flexs flex-col space-y-6">
          <div className="max-w-7xl mx-auto pt-16 ">
            <div className="w-full overflow-hidden rounded-lg shadow-xs">
              <div className="w-full overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400">
                      <th className="px-4 py-3">ItemName</th>
                      <th className="px-4 py-3">Quantity Ordered</th>
                      <th className="px-4 py-3">Unit Price</th>
                      <th className="px-4 py-3">Total Price</th>
                      <th className="px-4 py-3">Quantity Delivered</th>
                      <th className="px-4 py-3">Quantity Received</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y dark:divide-gray-500">
                    {order?.items.map((order, i) => (
                      <tr
                        key={i}
                        className="bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center text-sm">
                            <div>
                              <p className="font-semibold">{order.itemName}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">{order.quantity}</td>
                        <td className="px-4 py-3 text-xs">
                          <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                            {order.unitPrice}{" "}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {order.totalPrice}
                        </td>
                        <td className="px-4 py-3">
                          <input
                            className="border-2 border-gray-600"
                            type="number"
                            name={`quantityDelivered-${i}`}
                            onChange={(e) => handleItemChange(e, i)}
                            id="quantityDelivered"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            className="border-2 border-gray-600"
                            type="number"
                            name={`quantityReceived-${i}`}
                            onChange={(e) => handleItemChange(e, i)}
                            id="quantityReceived"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <button type="submit">Create Delivery</button>
        </div>
      </form>
    </div>
  );
}

export default CreateDelivery;
