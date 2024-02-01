import React, { useState, useEffect } from "react";
import { axiosApi } from "../../../api";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Address {
  box: string;
  country: string;
  city: string;
  location: string;
}

interface Item {
  itemId: string;
  itemName: string;
  itemNumber: string;
  itemDescription: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

interface PurchaseOrder {
  purchaseOrderId: number;
  purchaseOrderTitle: string;
  deliveryDate: string;
  termsAndConditions: string;
  paymentType: string;
  approvalStatus: string;
  createdAt: string;
  updatedAt: string;
  supplier?: Supplier;
  items?: Item[];
}

interface Supplier {
  vendorId: number;
  name: string;
  contactPerson: string;
  contactInformation: string;
  address: Address;
  email: string;
  phoneNumber: string;
  paymentType: string;
  termsAndConditions: string;
  createdAt: string;
  updatedAt: string;
}

interface Invoice {
  invoiceId: string;
  invoiceNumber: string;
  dueDate: string;
  totalAmount: number;
  purchaseOrder?: PurchaseOrder;
  createdAt: string;
  updatedAt: string;
}

const Invoice: React.FC = () => {
  const { id } = useParams();
  const [invoiceDetailsList, setInvoiceDetailsList] = useState<
    Invoice[][] | null
  >(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const invoiceId = "17df3f37-0b5f-4508-b37a-3cc6b0791896"; // Replace with the actual invoice ID

    const fetchInvoiceDetails = async () => {
      try {
        const response = await axiosApi.get(`/invoices/invoice-details/${id}`);
        const data = await response.data;
        setInvoiceDetailsList(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching invoice details:", error);
        setLoading(false);
      }
    };

    fetchInvoiceDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!invoiceDetailsList) {
    return <div>Invoice details not found.</div>;
  }
  console.log(invoiceDetailsList, "details");

  return (
    <div className="max-w-7xl mx-auto py-16">
      {invoiceDetailsList.map((invoiceDetails, index) => (
        <div key={index}>
          <h1>Invoice Details</h1>
          <p>Invoice Number: {invoiceDetails[0].invoiceNumber}</p>
          <p>Due Date: {invoiceDetails[0].dueDate}</p>
          {/* Display other invoice details here */}

          <h2>Purchase Order Details</h2>
          <p>
            Purchase Order Title:{" "}
            {invoiceDetails[0].purchaseOrder?.purchaseOrderTitle}
          </p>
          {/* Display other purchase order details here */}

          <h3>Items</h3>
          <ul>
            {invoiceDetails[0].purchaseOrder?.items?.map((item) => (
              <li key={item.itemId}>
                {item.itemName} - Quantity: {item.quantity}
              </li>
            ))}
          </ul>

          <h3>Supplier Details</h3>
          {/* Display other supplier details here */}
          <p>
            Supplier Name: {invoiceDetails[1].purchaseOrder?.supplier?.name}
          </p>
          {/* Display other supplier details here */}
        </div>
      ))}
    </div>
  );
};

export default Invoice;
