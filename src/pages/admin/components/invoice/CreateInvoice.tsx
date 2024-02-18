import React from "react";
import { toast } from "react-toastify";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "react-query";
import { axiosApi } from "../../../../api";
import { PurchaseOrder } from "../../types";


const CreateInvoice = () => {
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
      // Refetch the list of purchase orders after creating the invoice
      queryClient.invalidateQueries("purchaseOrders");
    },
  });
  const [invoiceData, setInvoiceData] = React.useState({
    invoiceNumber: "",
    dueDate: "",
    totalAmount: 0,
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
    <div className="py-16 flex justify-center items-center">
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <label htmlFor="purchaseOrderId">Select Purchase Order:</label>
        <select
          id="purchaseOrderId"
          name="purchaseOrderId"
          value={invoiceData.purchaseOrderId}
          onChange={handleInputChange}
        >
          <option value="">Select a Purchase Order</option>
          {purchaseOrders &&
            purchaseOrders.map((order: PurchaseOrder) => (
              <option key={order.purchaseOrderId} value={order.purchaseOrderId}>
                {order.purchaseOrderTitle}
              </option>
            ))}
        </select>

        <label htmlFor="invoiceNumber">Invoice Number:</label>
        <input
          type="text"
          id="invoiceNumber"
          name="invoiceNumber"
          value={invoiceData.invoiceNumber}
          onChange={handleInputChange}
        />

        <label htmlFor="dueDate">Due Date:</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={invoiceData.dueDate}
          onChange={handleInputChange}
        />

        <label htmlFor="totalAmount">Total Amount:</label>
        <input
          type="number"
          id="totalAmount"
          name="totalAmount"
          value={invoiceData.totalAmount}
          onChange={handleInputChange}
        />

        <button type="submit">Create Invoice</button>
      </form>
    </div>
  );
};

export default CreateInvoice;
