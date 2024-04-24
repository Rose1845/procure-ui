/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { PurchaseOrder } from "../../types";
import useApi from "@/hooks/useApi";

const CreateInvoice = () => {
  const { axiosApi } = useApi()

  const queryClient = useQueryClient();
  const { data: purchaseOrders } = useQuery(
    "purchaseOrders",
    fetchPurchaseOrders
  );
  const mutation = useMutation(createInvoice, {
    onSuccess: (responseData) => {
      console.log("Response from backend:", responseData);
      toast.success("Invoice created successfully");
    },
    onError: (error) => {
      console.error("Error creating invoice:", error);
      toast.error("Error creating invoice");
    },
    onSettled: () => {
      queryClient.invalidateQueries("purchaseOrders");
    },
  });
  const [invoiceData, setInvoiceData] = React.useState({
    dueDate: "",
    invoiceDate: "",
    purchaseOrderId: 0,
  });
  async function fetchPurchaseOrders() {
    const response = await axiosApi.get("/purchase-order");
    return response.data;
  }

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setInvoiceData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate(invoiceData);
  };

  async function createInvoice(dataToSend: any) {
    const response = await axiosApi.post("/invoices/add", dataToSend);
    
    return response.data;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="max-w-md mx-auto">
          <div className="flex items-center space-x-5">
            <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
              i
            </div>
            <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
              <h2 className="leading-relaxed">Add Invoice</h2>
            </div>
          </div>
          <form className="divide-y divide-gray-200" onSubmit={handleSubmit}>
            <label htmlFor="purchaseOrderId">Select Purchase Order:</label>
            <select
              id="purchaseOrderId"
              name="purchaseOrderId"
              value={invoiceData.purchaseOrderId}
              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
              onChange={handleInputChange}
            >
              <option value="">Select a Purchase Order</option>
              {purchaseOrders &&
                purchaseOrders.map((order: PurchaseOrder) => (
                  <option
                    key={order.purchaseOrderId}
                    value={order.purchaseOrderId}
                  >
                    {order.purchaseOrderTitle}
                  </option>
                ))}
            </select>

            <div className="flex flex-col">
              <label className="leading-loose">Invoice Date</label>
              <div className="relative focus-within:text-gray-600 text-gray-400">
                <input
                  type="date"
                  id="invoiceDate"
                  name="invoiceDate"
                  value={invoiceData.invoiceDate}
                  onChange={handleInputChange}
                  className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  placeholder="02/26/2020"
                />
                <div className="absolute left-3 top-2">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="leading-loose">Due Date</label>
              <div className="relative focus-within:text-gray-600 text-gray-400">
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={invoiceData.dueDate}
                  onChange={handleInputChange}
                  className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  placeholder="02/26/2020"
                />
                <div className="absolute left-3 top-2">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-Linecap="round"
                      stroke-Linejoin="round"
                      stroke-Width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center space-x-4">
              <button className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">
                Create Invoice
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;
