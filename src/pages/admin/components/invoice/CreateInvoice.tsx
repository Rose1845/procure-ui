// CreateInvoice.tsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { PurchaseOrder, PurchaseOrderData } from "../../types";
import { axiosApi } from "../../../../api";
import { useParams } from "react-router-dom";

const CreateInvoice = () => {
  const { id } = useParams();

  //   const [purchaseOrderId, setPurchaseOrderId] = useState("");
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [purchaseOrderData, setPurchaseOrderData] =
    React.useState<PurchaseOrderData>({
      purchaseOrderTitle: "",
      deliveryDate: "",
      termsAndConditions: "",
      paymentType: "MPESA" || "PAYPAL",
      items: [],
      vendorId: 0,
    });

  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: "",
    dueDate: "",
    totalAmount: 0,
  });

  useEffect(() => {
    // Fetch the list of purchase orders
    const fetchPurchaseOrders = async () => {
      try {
        const response = await axiosApi.get("/api/v1/purchase-order");
        setPurchaseOrders(response.data);
      } catch (error) {
        toast.error("Error fetching purchase orders");
        console.error("Error fetching purchase orders:", error);
      }
    };
    fetchPurchaseOrders();
  }, []);

  const handlePurchaseOrderChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `/api/purchase-order/get/order-items/${id}`
      );
      //   setPurchaseOrderId(id);
      setPurchaseOrderData(response.data);
    } catch (error) {
      toast.error("Error fetching purchase order details");
      console.error("Error fetching purchase order details:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvoiceData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/api/v1/invoices/${id}`, {
        ...invoiceData,
      });
      toast.success("Invoice created successfully");
    } catch (error) {
      toast.error("Error creating invoice");
      console.error("Error creating invoice:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="purchaseOrderId">Select Purchase Order:</label>
      <select
        id="purchaseOrderId"
        name="purchaseOrderId"
        onChange={handlePurchaseOrderChange}
      >
        <option value="">Select a Purchase Order</option>
        {purchaseOrders?.map((order) => (
          <option key={order.purchaseOrderId} value={order.purchaseOrderId}>
            {order.purchaseOrderId}
          </option>
        ))}
      </select>

      {/* Display purchase order details */}

      {/* Invoice form fields */}
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
  );
};

export default CreateInvoice;
