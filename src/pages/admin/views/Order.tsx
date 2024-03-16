import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosApi } from "../../../api";
import { PurchaseOrder } from "../types";
import { toast } from "react-toastify";
import MarkPaid from "../components/order/MarkPaid";

const OrderView = () => {
  const { id } = useParams();
  const [order, setOrder] = React.useState<PurchaseOrder>();
  const [isLoadig, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchCategory = async () => {
      try {
        const response = await axiosApi.get(
          `/purchase-order/get/order-items/${id}`,
          { signal: abortController.signal }
        );
        const categoryData = response.data;
        setOrder(categoryData);
        console.log("order retrived successfully");
      } catch (error) {
        console.error("Error updating order:", error);
      }
    };

    fetchCategory();
    return () => {
      abortController.abort();
    };
  }, [id]);
  const sendToSupplier = async () => {
    setIsLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axiosApi.post(`/purchase-order/send-order-to-supplier/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      toast.success(response.data.message);
      console.log("Response from backend:", response.data);
    } catch (error) {
      toast.error("An error occurred while sending order to supplier");
      console.error("Error sending order to supplier:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex flex-col justify-center items-center mx-auto mt-8 py-16">
      <div className="flex flex-col border justify-center border-gray-300 space-y-2 items-center">
        <MarkPaid />
        <button
          type="submit"
          disabled={isLoadig}
          onClick={sendToSupplier}
          className={`bg-green-500 mt-5 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300 ${
            isLoadig ? "bg-opacity-35 cursor-not-allowed" : ""
          }`}
        >
          Send to Supplier
        </button>
      </div>{" "}
      <div className="min-w-full ml-64">
        <div className="flex flex-col space-y-3">
          <td className="px-4 py-3 text-xs">
            <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">
             Status: {order?.approvalStatus}
            </span>
          </td>
          <h2 className="text-xl">Order Name: {order?.purchaseOrderTitle}</h2>
          <h2 className="text-xl">CreatedOn:</h2>
          <h2 className="text-xl">Order PaymentType: {order?.paymentType}</h2>
          <h2 className="text-xl">Expires On: {order?.deliveryDate}</h2>
        </div>
        <div className="text-xl">
          Terms and Condition:
          {order?.termsAndConditions}
        </div>
      </div>
     
      <div className="min-w-full ml-64">
        <div className="w-full  pt-16 ">
          <div className="w-full overflow-hidden rounded-lg shadow-xs">
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400">
                    <th className="px-4 py-3">ItemName</th>
                    <th className="px-4 py-3">Quantity</th>
                    <th className="px-4 py-3">Unit Price</th>
                    <th className="px-4 py-3">Total Price</th>
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
                      <td className="px-4 py-3 text-sm">{order.totalPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end">Total Amount: {order?.totalAmount}</div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default OrderView;
