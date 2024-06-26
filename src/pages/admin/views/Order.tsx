import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PurchaseOrder, Supplier } from "../types";
import { toast } from "react-toastify";
import MarkPaid from "../components/order/MarkPaid";
import useApi from "@/hooks/useApi";

const OrderView = () => {
  const { axiosApi } = useApi()

  const { id } = useParams();
  const [order, setOrder] = React.useState<PurchaseOrder>();
  const [isLoadig, setIsLoading] = useState<boolean>(false);
  const [supplierDetails, setSupplierDetails] = React.useState<Supplier>();

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
    const fetchSupplierDetails = async () => {
      try {
        const response = await axiosApi.get(`/suppliers/supplier/${order?.vendorId}`);
        console.log(response.data, "supplier de");

        setSupplierDetails(response.data);
        console.log("Supplier details retrieved successfully");
      } catch (error) {
        console.error("Error fetching Supplier details:", error);
      }
    };

    fetchCategory();
    fetchSupplierDetails()
    return () => {
      abortController.abort();
    };
  }, [id, order?.vendorId]);

  const sendToSupplier = async () => {
    setIsLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axiosApi.post(`/purchase-order/send-order-to-supplier/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      toast.success("sent successfully");
      console.log("Response from backend:", response.data);
    } catch (error) {
      toast.error("An error occurred while sending order to supplier");
      console.error("Error sending order to supplier:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const cloneOrder = async () => {
    try {
      const response = await axiosApi.post(
        `/purchase-order/clone-order/${id}`
      );
      if (!response.data) {
        throw new Error(
          `Failed to cloned: ${response.statusText}`
        );
      }
      toast.success("Order cloned successfully");
      console.log("Response from backend:", response.data);
    } catch (error) {
      toast.error("An error occurred while sending contract to supplier");
      console.error("Error sending order to supplier:", error);
    }
  };
  return (
    <div className="container flex flex-col justify-center items-center mx-auto mt-8 py-16">
      <div className="flex flex-row space-x-3 border-gray-300 space-y-2 items-center">

        <div>
          {(order?.approvalStatus == "ISSUED" || order?.approvalStatus == "OPEN" && (
            <MarkPaid />
          ))}
        </div>
        <div>
          {(
            order?.approvalStatus !== "CLOSED" && order?.approvalStatus !== "REJECT" && order?.approvalStatus !== "APPROVED" && (
              <button
                type="submit"
                disabled={isLoadig}
                onClick={sendToSupplier}
                className={`bg-green-500 mt-5 text-white py-2 px-4 uppercase rounded hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300 ${isLoadig ? "bg-opacity-35 cursor-not-allowed" : ""
                  }`}
              >
                {order?.approvalStatus === "OPEN" || order?.approvalStatus === "FULLY_RECEIVED" ? "RESEND to supplier" : "SEND TO SUPPLIER"}
              </button>
            )
          )}

        </div>

        <div>
          <button
            type="submit"
            onClick={() => cloneOrder()} // Pass the 'id' to the function
            className="bg-green-500 uppercase mt-5 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300"
          >
            Clone Order </button>
        </div>
      </div>{" "}
      <div className="min-w-full ml-64">
        <div className="flex flex-col space-y-2">
          <td className="px-4 py-3 text-xs">
            <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">
              Status: {order?.approvalStatus}
            </span>
          </td>
          <h2 className="text-[16px]">Order Name: {order?.purchaseOrderTitle}</h2>
          <h2 className="text-[16px]">CreatedOn:</h2>
          <h2 className="text-[16px]">Order PaymentType: {order?.paymentType}</h2>
          <h2 className="text-[16px]">Expires On: {order?.deliveryDate}</h2>
        </div>
        <div className="text-[16px]">
          Terms and Condition:
          {order?.termsAndConditions}
        </div>

        <div className="pt-3 space-y-2">
          <h1 className="text-xl font-bold">Supplier Details</h1>
          {supplierDetails && (
            <div>
              <h2 className="text-[16px]">Supplier Name: {supplierDetails.name}</h2>
              <h2 className="text-[16px]">Supplier Email: {supplierDetails.email}</h2>
              <h2 className="text-[16px]">Address:{supplierDetails.address.box}{supplierDetails.address.city},{supplierDetails.address.country}</h2>
              <h2 className="text-[16px]">Location:{supplierDetails.address.location}</h2>
              <p className="text-[16px]">Payment Terms: {supplierDetails.paymentType}</p>
            </div>
          )}
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
                      className="bg-gray-50 hover:bg-gray-100  text-gray-700 dark:text-gray-400"
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
