import React, { useState, useEffect } from "react";
import { axiosApi } from "../../../api";
import { FaTrashAlt } from "react-icons/fa";
import { PurchaseOrder } from "../types";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa6";
import JSZip from "jszip";
type Invoice = {
  invoiceId: string;
  invoiceNumber: string;
  dueDate: string;
  totalAmount: number;
  invoiceStatus: string;
  purchaseOrder?: PurchaseOrder;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
};

const Invoice: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    fetchInvoice()
      .then((data) => {
        return setInvoices(data);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  const fetchInvoice = async () => {
    // try {
    const response = await axiosApi.get("/invoices");
    const invoicedata = response.data;
    setInvoices(invoicedata);
    return invoicedata;
    // } catch (error) {
    //   console.error("Error fetching invoice details:", error);
    // }
  };
  const generatePDFForOrder = async (invoiceId: string) => {
    try {
      const response = await axiosApi.get(`/invoices/${invoiceId}/report`, {
        responseType: "arraybuffer",
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });

      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice_report.pdf`;

      // Append the link to the document and trigger the download
      document.body.appendChild(link);
      link.click();

      // Clean up by revoking the URL and removing the link from the document
      // window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Handle error
    }
  };

  const generateAndDownloadZip = async (invoices: Invoice[]) => {
    const zip = new JSZip();

    // Iterate over each order and generate PDF report
    for (const invoice of invoices) {
      try {
        const response = await axiosApi.get(`/invoices/${invoice.invoiceId}/report`, {
          responseType: 'arraybuffer',
        });

        const blob = new Blob([response.data], { type: 'application/pdf' });
        zip.file(`invoice_report.pdf`, blob);
      } catch (error) {
        console.error(`Error generating PDF for order ${invoice.invoiceId}:`, error);
      }
    }

    // Generate and download the zip folder
    zip.generateAsync({ type: 'blob' }).then((content: Blob | MediaSource) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(content);
      link.download = 'order_reports.zip';
      link.click();
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosApi.delete(`/invoices/${id}`);
      console.log(`Invoice with ID ${id} deleted successfully`);

      // Update state after deletion
      fetchInvoice();
    } catch (error) {
      console.error(`Error deleting supplier with ID ${id}:`, error);
    }
  };
  return (
    <div className="max-w-7xl mx-auto py-16">
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-blue-600 text-white">
          <Link to={"/dashboard/invoice/add"}> Add Invoice</Link>
        </button>
      </div>
      <div className="max-w-7xl mx-auto pt-16 ">
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <div>
                <div className="text-xs flex flex-row space-x-3 font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400">
                  <div className="px-4 py-3">Invoice</div>
                  <div className="px-4 py-3">Status</div>
                  <div className="px-4 py-3">Last Edited</div>
                </div>
              </div>
              <tbody className="bg-white divide-y dark:divide-gray-500">
                {invoices.map((order, i) => (
                  <div
                    key={i}
                    className="bg-gray-50 flex flex-row space-x-3 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400"
                  >
                    <div className="px-4 py-3">
                      <div className="flex items-center text-sm">
                        <div>
                          <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                            Invoice Status: {order.invoiceStatus}{" "}
                          </span>

                          <p className="font-semibold">
                            Invoice #{order.invoiceNumber}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 text-sm">
                      Due Date:{order.dueDate}
                    </div>

                    <div className="px-4 py-3 text-sm">
                      Created On:{new Date(order.createdAt).toLocaleString()}
                    </div>
                    <div className="px-4 py-3 text-sm">
                      <button
                        className="text-neutral-900 bg-gray-400 rounded-sm hover:underline"
                        onClick={() => handleDelete(order.invoiceId)}
                      >
                        <FaTrashAlt />
                      </button>
                      <Link
                        to={`/dashboard/invoice/view/${order.invoiceId}`}
                      >
                        <FaEye />
                      </Link>
                    </div>
                    <div className="flex flex-col items-end justify-end">
                      <span className="px-4 py-3 text-sm">
                        PurchaseOrderTitle:{" "}
                        {order.purchaseOrder?.purchaseOrderTitle}
                      </span>
                      <span className="px-4 py-3 text-sm">
                        PurchaseOrderStatus:{" "}
                        {order.purchaseOrder?.approvalStatus}
                      </span>
                    </div>
                    <td className="px-4 mb-4 py-3 text-sm">
                      <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-md"
                        onClick={() => generatePDFForOrder(order.invoiceId)}
                      >
                        Generate Report
                      </button>
                    </td>
                  </div>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end flex-row sapce-x-3 mb-4">
            <div>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={() => generateAndDownloadZip(invoices)}
              >
                EXPORT TO PDF
              </button>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
