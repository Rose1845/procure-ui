import React from "react";
import { useParams } from "react-router-dom";
import { axiosApi } from "../../../api";
import { Invoice, PurchaseOrder } from "../types";
import { toast } from "react-toastify";

const InvoiceView = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = React.useState<Invoice>();
  const [order, setOrder] = React.useState<PurchaseOrder>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  React.useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axiosApi.get(`/invoices/${id}`);
        setInvoice(response.data);
        console.log("Invoice retrived successfully");
      } catch (error) {
        console.error("Error updating Invoice:", error);
      }
    };
    const fetchCategory = async () => {
      try {
        const response = await axiosApi.get(
          `/purchase-order/get/order-items/${invoice?.purchaseOrder.purchaseOrderId}`,
        );
        const categoryData = response.data;
        setOrder(categoryData);
        console.log("invoice retrived successfully");
      } catch (error) {
        console.error("Error updating invoice:", error);
      }
    };
    fetchInvoice();
    fetchCategory()
  }, [id, invoice?.purchaseOrder.purchaseOrderId]);

  const markAsPaid = async () => {
    setIsLoading(true)

    try {
      const response = await axiosApi.patch(
        `/invoices/edit-invoice/${id}`,
        null,
        {
          params: {
            contractStatus: "PAID",
          }
        }
      );
      const responseData = response.data;
      toast.success("invoice marked successfully");
      console.log("Response from backend:", responseData);
    } catch (error) {
      toast.error("Error approving contract");
      console.error("Error approving contract:", error);
    } finally {
      setIsLoading(false)
    }
  };
  return (
    <div className="container flex flex-col justify-center items-center mx-auto mt-8 py-16">
      <div className="flex items-center justify-start flex-col">
        <div>
          <button
            type="submit"
            disabled={isLoading}
            onClick={() => markAsPaid()} // Pass the 'id' to the function
            className="bg-green-500 uppercase mt-5 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300"
          >
            MARK AS PAID
          </button>
        </div>
        <div className="flex justify-start flex-col">
          <div className="flex justify-start flex-col">
            <h2>InvoiceNumber:{invoice?.invoiceNumber}</h2>
            <div>Due Date:{invoice?.dueDate}</div>
          </div>
          <div className="flex flex-col space-y-2">
            <td className="px-4 py-3 text-xs">
              <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">
                Status: {invoice?.purchaseOrder.approvalStatus}
              </span>
            </td>
            <h2 className="text-[16px]">Purchase Order Title: {invoice?.purchaseOrder.purchaseOrderTitle}</h2>
            <h2 className="text-[16px]">CreatedOn:</h2>
            <h2 className="text-[16px]">invoice PaymentType: {invoice?.purchaseOrder.paymentType}</h2>
            <h2 className="text-[16px]">Expires On: {invoice?.purchaseOrder.deliveryDate}</h2>
          </div>
          <div className="text-[16px]">
            Terms and Condition:
            {invoice?.purchaseOrder.termsAndConditions}
          </div>
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
                  {order?.items && order.items.map((order, i) => (
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
            <div className="flex justify-start">Total Amount: Ksh:{order?.totalAmount}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceView;
