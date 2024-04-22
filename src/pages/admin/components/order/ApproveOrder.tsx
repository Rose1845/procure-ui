import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { PurchaseOrder, Supplier } from "../../types";
import { toast } from "react-toastify";
import useApi from "@/hooks/useApi";

const ApproveOrder = () => {
  const { axiosApi } = useApi();

  const { id } = useParams();
  const [order, setOrder] = React.useState<PurchaseOrder>();
  const [approvalAction, setApprovalAction] = React.useState<string>("");
  const [supplierDetails, setSupplierDetails] = React.useState<Supplier>();
  useEffect(() => {
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
    const fetchSupplierDetails = async () => {
      try {
        const response = await axiosApi.get(
          `/suppliers/supplier/${order?.vendorId}`
        );
        console.log(response.data, "supplier de");

        setSupplierDetails(response.data);
        console.log("Supplier details retrieved successfully");
      } catch (error) {
        console.error("Error fetching Supplier details:", error);
      }
    };
    fetchSupplierDetails();
    fetchCategory();
  }, [id, order?.vendorId]);
  const handleApprovalAction = (action: string) => {
    setApprovalAction(action);
    ApproveContract();
  };

  const ApproveContract = async () => {
    try {
      const response = await axiosApi.patch(
        `/purchase-order/approve/${id}`,
        null,
        {
          params: {
            approvalStatus: `${approvalAction}`,
          },
        }
      );

      if (!response.data) {
        throw new Error(
          `Failed to send contract to supplier: ${response.statusText}`
        );
      }
      toast.success("Contract sent to supplier successfully");
      console.log("Response from backend:", response.data);
    } catch (error) {
      toast.error("An error occurred while sending contract to supplier");
      console.error("Error sending contract to supplier:", error);
    }
  };

  return (
    <div className="flex w-full flex-col px-4  mt-8 py-16">
      {/* <div>
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
      </div> */}
      <div className="flex items-center">
        {order?.approvalStatus !== "ACCEPTED" &&
          order?.approvalStatus !== "TERMINATED" &&
          order?.approvalStatus !== "REJECT" &&
          order?.approvalStatus !== "APPROVED" && (
            <div>
              <button
                onClick={() => handleApprovalAction("APPROVED")}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300 mr-2"
              >
                ACCEPTED{" "}
              </button>
              <button
                onClick={() => handleApprovalAction("REJECT")}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring focus:border-red-300 mr-2"
              >
                DECLINE
              </button>
            </div>
          )}
      </div>

      <div>
        <div className="flex flex-col space-y-2">
          <h2 className="text-[16px]">
            Order Name: {order?.purchaseOrderTitle}
          </h2>
          <h2 className="text-[16px]">CreatedOn:</h2>
          <h2 className="text-[16px]">
            Order PaymentType: {order?.paymentType}
          </h2>
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
              <h2 className="text-[16px]">
                Supplier Name: {supplierDetails.name}
              </h2>
              <h2 className="text-[16px]">
                Supplier Email: {supplierDetails.email}
              </h2>
              <h2 className="text-[16px]">
                Address:{supplierDetails.address.box}
                {supplierDetails.address.city},{supplierDetails.address.country}
              </h2>
              <h2 className="text-[16px]">
                Location:{supplierDetails.address.location}
              </h2>
              <p className="text-[16px]">
                Payment Terms: {supplierDetails.paymentType}
              </p>
            </div>
          )}
        </div>
        <div className="w-full mx-auto pt-16 ">
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
              <div className="mt-3">Total Amount : {order?.totalAmount}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApproveOrder;
