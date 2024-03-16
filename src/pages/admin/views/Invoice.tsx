import React from "react";
import { useParams } from "react-router-dom";
import { axiosApi } from "../../../api";
import { Invoice } from "../types";

const InvoiceView = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = React.useState<Invoice>();
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
    fetchInvoice();
  }, [id]);

  return (
    <div className="container mx-auto mt-8 py-16">
      <div key={invoice?.invoiceId}>
        <div>
          <h2>{invoice?.invoiceNumber}</h2>
          <div>{invoice?.dueDate}</div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceView;
