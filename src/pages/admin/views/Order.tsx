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

  // const markAsPaid = async () => {
  //   const abortController = new AbortController();

  //   setIsLoading(true);
  //   try {
  //     const response = await axiosApi.patch(
  //       `/purchase_order/approve/${id}?approvalStatus=CLOSED`,
  //       { signal: abortController.signal }
  //     );
  //     console.log("reponse padi", response.data);
  //     toast.success(response.data.message);
  //     console.log("Response from backend:", response.data);
  //   } catch (error) {
  //     toast.error("An error occurred while sending order to supplier");
  //     console.error("Error sending order to supplier:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const sendToSupplier = async () => {
    setIsLoading(true);
    try {
      const response = await axiosApi.post(
        `/purchase-order/send-order-to-supplier/${id}`
      );

      console.log(response.data);
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
      <div className="flex flex-col space-y-2 items-center">
        {/* <button
          onClick={markAsPaid}
          disabled={isLoadig}
          className={`bg-green-500 mt-5 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300 ${
            isLoadig ? "bg-opacity-35 cursor-not-allowed" : ""
          }`}
        >
          Mark as FULLY RECEIVED{" "}
        </button> */}
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
      <div>
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
          order Terms and Condition:
          {order?.termsAndConditions}
        </div>
      </div>
      <div>
        <div className="max-w-7xl mx-auto pt-16 ">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderView;
