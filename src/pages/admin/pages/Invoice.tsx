import React, { useState } from "react";
import { PurchaseOrder, Supplier } from "../types";
import { Link } from "react-router-dom";
import JSZip from "jszip";
import useApi from "@/hooks/useApi";
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
  const { axiosApi } = useApi();

  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const [page, setPage] = React.useState<number>(0);
  const [totalPages, setTotalPages] = React.useState<number>(0);
  const [totalItems, setTotalItems] = React.useState<number>(0);
  const [sortBy, setSortBy] = React.useState<string>("createdAt"); // Default sort by createdAt
  const [sortDirection, setSortDirection] = React.useState<string>("desc"); // Default sort direction
  const [searchParams, setSearchParams] = React.useState<{
    invoiceNumber?: string;
    startDate?: string;
    endDate?: string;
  }>({});
  const [selectedApprovalStatus, setSelectedApprovalStatus] = React.useState<
    string | null
  >(null);
  const [selectedInvoiceStatus, setSelectedInvoiceStatus] = React.useState<
    string | null
  >(null);
  const [suppliers, setSuppliers] = React.useState<Supplier[]>([]);
  const [selectedSupplier, setSelectedSupplier] = React.useState<string | null>(
    null
  ); // Added state for selected supplier

  const pageSize = 5;
  React.useEffect(() => {
    fetchInvoice();
    fetchSuppliers();
  }, [
    page,
    sortBy,
    sortDirection,
    selectedSupplier,
    selectedApprovalStatus,
    selectedInvoiceStatus,
  ]);
  const fetchSuppliers = async () => {
    try {
      const response = await axiosApi.get("/suppliers");
      const suppliersData = response.data;
      setSuppliers(suppliersData);
      console.log("Suppliers retrieved successfully");
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };
  const fetchInvoice = async () => {
    // try {
    try {
      let url = `/invoices/paginations?page=${page}&size=${pageSize}`;
      if (selectedSupplier) {
        url += `&supplierId=${selectedSupplier}`;
      }
      if (searchParams.invoiceNumber) {
        url += `&searchField=${searchParams.invoiceNumber}`;
      }
      if (selectedApprovalStatus) {
        url += `&approvalStatus=${selectedApprovalStatus}`;
      }
      if (selectedInvoiceStatus) {
        url += `&invoiceStatus=${selectedInvoiceStatus}`;
      }
      url += `&sortField=${sortBy}&sortDirection=s${sortDirection}`;
      if (searchParams.startDate) {
        url += `&startDate=${searchParams.startDate}`;
      }
      if (searchParams.endDate) {
        url += `&endDate=${searchParams.endDate}`;
      }
      const response = await axiosApi.get(url);
      const {
        content,
        totalPages: total,
        totalElements: totalItems,
      } = response.data;
      setInvoices(content);
      setTotalPages(total);
      setTotalItems(totalItems);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const generatePDFForOrder = async (invoiceId: string) => {
    try {
      const response = await axiosApi.get(`/invoices/${invoiceId}/report`, {
        responseType: "arraybuffer",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });

      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a link element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice_report.pdf`;

      // Append the link to the document and trigger the download
      document.body.appendChild(link);
      link.click();

      // Clean up by revoking the URL and removing the link from the document
      // window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating PDF:", error);
      // Handle error
    }
  };

  const generateAndDownloadZip = async (invoices: Invoice[]) => {
    const zip = new JSZip();

    // Iterate over each order and generate PDF report
    for (const invoice of invoices) {
      try {
        const response = await axiosApi.get(
          `/invoices/${invoice.invoiceId}/report`,
          {
            responseType: "arraybuffer",
          }
        );

        const blob = new Blob([response.data], { type: "application/pdf" });
        zip.file(`invoice_report.pdf`, blob);
      } catch (error) {
        console.error(
          `Error generating PDF for order ${invoice.invoiceId}:`,
          error
        );
      }
    }

    // Generate and download the zip folder
    zip.generateAsync({ type: "blob" }).then((content: Blob | MediaSource) => {
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(content);
      link.download = "order_reports.zip";
      link.click();
    });
  };

  // const handleDelete = async (id: string) => {
  //   try {
  //     await axiosApi.delete(`/invoices/${id}`);
  //     console.log(`Invoice with ID ${id} deleted successfully`);

  //     // Update state after deletion
  //     fetchInvoice();
  //   } catch (error) {
  //     console.error(`Error deleting invoice with ID ${id}:`, error);
  //   }
  // };
  const handleSortChange = (column: string) => {
    if (column === sortBy) {
      // Toggle sort direction if the same column is clicked again
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set new sort column and default direction to ascending
      setSortBy(column);
      setSortDirection("desc");
    }
  };
  const handleSearchParamsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchParams({
      ...searchParams,
      [event.target.name]: event.target.value,
    });
  };

  const handleSearch = () => {
    fetchInvoice();
  };
  const clearSearchParams = () => {
    setSearchParams({
      invoiceNumber: "",
      endDate: "",
      startDate: "",
    });
    fetchInvoice();
  };
  const handleSupplierChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedSupplier(event.target.value);
  };
  const handleApprovalStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedApprovalStatus(event.target.value);
  };
  const handleInvoiceStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedInvoiceStatus(event.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const startIndex = page * pageSize + 1;
  const endIndex = Math.min((page + 1) * pageSize, totalItems);

  return (
    <div className="max-w-7xl mx-auto py-16">
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-blue-600 text-white">
          <Link to={"/dashboard/invoice/add"}> Add Invoice</Link>
        </button>
      </div>
      {/* <div className="max-w-7xl mx-auto pt-16 ">
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
                      </Link>invoiceNumber
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
      </div> */}
      <div className="max-w-7xl mx-auto mr-11 pt-16 flex flex-col">
        <div className="flex flex-col justify-start">
          <div>
            <div className="flex flex-col justify-start">
              <div>
                <h3>Search...</h3>
                <input
                  type="text"
                  name="invoiceNumber"
                  value={searchParams.invoiceNumber || ""}
                  onChange={handleSearchParamsChange}
                  placeholder="Search by invoice number ..."
                  className="bg-white border border-gray-300 rounded px-3 py-1"
                />
              </div>
              {/* Date range filters */}
              <div className="flex flex-col space-y-3 mt-3">
                <h3>Search by Date Range</h3>
                <div className="flex  space-x-3 mt-3">
                  <div>
                    <input
                      type="date"
                      name="startDate"
                      value={searchParams.startDate || ""}
                      onChange={handleSearchParamsChange}
                      className="bg-white border border-gray-300 rounded px-3 py-1"
                    />
                  </div>
                  <div>
                    <input
                      type="date"
                      name="endDate"
                      value={searchParams.endDate || ""}
                      onChange={handleSearchParamsChange}
                      className="bg-white border border-gray-300 rounded px-3 py-1"
                    />
                  </div>
                </div>
              </div>
              <div className=" flex flex-row space-x-3 mt-3">
                <button
                  onClick={handleSearch}
                  className="bg-blue-600 text-white px-4 py-2"
                >
                  Search
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white"
                  onClick={clearSearchParams}
                >
                  Clear Search
                </button>
              </div>
            </div>
            <div className="flex mt-3 flex-col justify-start">
              <div className="font-bold">Filter By:</div>
              <div className="flex flex-col space-y-3">
                <select
                  id="supplier"
                  value={selectedSupplier || ""}
                  onChange={handleSupplierChange}
                  className="bg-white border border-gray-300 rounded px-3 py-1"
                >
                  <option selected className="uppercase" value="">
                    ALL SUPPLIERS
                  </option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.vendorId} value={supplier.vendorId}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
                <select
                  id="approvalStatus"
                  value={selectedApprovalStatus || ""}
                  onChange={handleApprovalStatusChange}
                  className="bg-white border border-gray-300 rounded px-3 py-1"
                >
                  <option selected value="">
                    ALL PO STATUSES
                  </option>
                  <option value="ISSUED">ISSUED</option>
                  <option value="FULLY_RECEIVED">FULLY RECEIVED</option>
                  <option value="CLOSED">CLOSED</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="REJECT">REJECT</option>
                  <option value="IN_DELIVERY">IN_DELIVERY</option>
                  <option value="PENDING">PENDING</option>
                </select>
                <select
                  id="invoiceStatus"
                  value={selectedInvoiceStatus || ""}
                  onChange={handleInvoiceStatusChange}
                  className="bg-white border border-gray-300 rounded px-3 py-1"
                >
                  <option selected value="">
                    ALL INVOICE STATUS
                  </option>
                  <option value="PAID">PAID</option>
                  <option value="APPROVED_FOR_PAYMENT">
                    APPROVED_FOR_PAYMENT
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400">
                  <th
                    className="px-4 py-3 cursor-pointer text-black font-bold"
                    onClick={() => handleSortChange("invoiceNumber")}
                  >
                    Invoice Number
                  </th>
                  <th className="px-4 py-3">CreatedAt</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-500">
                {invoices.length == 0 ? (
                  <tr className="text-gray-700 dark:text-gray-400">
                    <td colSpan={5} className="px-4 py-3 text-center">
                      No invoices found
                    </td>
                  </tr>
                ) : (
                  invoices.map((invoice, i) => (
                    <tr key={i}>
                      <td className="px-4 py-3">
                        <div className="flex invoices-center text-sm">
                          <div className="flex flex-col">
                            <p className="font-semibold">
                              {invoice.invoiceNumber}
                            </p>
                            <span className="text-sm">
                              PurchaseOrderTitle:{" "}
                              {invoice.purchaseOrder?.purchaseOrderTitle}
                            </span>
                            <span
                              className={` px-4 py-2 leading-tight text-neutral-950 rounded-full  ${
                                invoice.purchaseOrder?.approvalStatus ===
                                "COMPLETED"
                                  ? "bg-green-500 text-white"
                                  : invoice.purchaseOrder?.approvalStatus ===
                                    "FULLY_RECEIVED"
                                  ? "bg-purple-500 text-white"
                                  : invoice.purchaseOrder?.approvalStatus ===
                                    "ISSUED"
                                  ? "bg-gray-500 text-white"
                                  : invoice.purchaseOrder?.approvalStatus ===
                                    "REJECT"
                                  ? "bg-red-500 text-white"
                                  : invoice.purchaseOrder?.approvalStatus ===
                                    "PENDING"
                                  ? "bg-green-500 text-white"
                                  : invoice.purchaseOrder?.approvalStatus ===
                                    "IN_DELIVERY"
                                  ? "bg-blue-500 text-white"
                                  : "bg-blue-600 text-white" // Default color for other statuses
                              }`}
                            >
                              PurchaseOrderStatus:{" "}
                              {invoice.purchaseOrder?.approvalStatus}{" "}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {new Date(invoice.createdAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 space-x-3 text-sm">
                        {/* <button
                          className="text-red-600 hover:underline"
                          onClick={() => handleDelete(invoice.invoiceId)}
                        >
                          Delete
                          <FaTrashAlt />
                        </button> */}
                        <button className="uppercase bg-blue-600 px-4 py-2 text-white">
                          <Link
                            to={`/dashboard/invoice/view/${invoice.invoiceId}`}
                          >
                            View
                          </Link>
                        </button>
                      </td>
                      <td className="px-4 mb-4 py-3 text-sm">
                        <button
                          className="bg-blue-600 text-white px-4 py-2 rounded-md"
                          onClick={() => generatePDFForOrder(invoice.invoiceId)}
                        >
                          Generate Report
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400">
            <span className="flex invoices-center col-span-3">
              Showing {startIndex}-{endIndex} of {totalItems}
            </span>
            <span className="col-span-2"></span>
            <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
              <nav aria-label="Table navigation">
                <ul className="inline-flex invoices-center">
                  <li>
                    <button
                      className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                      aria-label="Previous"
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page === 0}
                    >
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                        ></path>
                      </svg>{" "}
                    </button>
                  </li>
                  {/* Render page numbers */}
                  {/* Example: */}
                  {[1, 2, 3, 4, 5].map((pageNumber) => (
                    <li key={pageNumber}>
                      <button
                        className={`px-3 py-1 rounded-md ${
                          page + 1 === pageNumber
                            ? "bg-blue-600 text-white"
                            : ""
                        } focus:outline-none focus:shadow-outline-purple`}
                        onClick={() => handlePageChange(pageNumber - 1)}
                      >
                        {pageNumber}
                      </button>
                    </li>
                  ))}
                  {/* Next button */}
                  <li>
                    <button
                      className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                      aria-label="Next"
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page === totalPages - 1}
                    >
                      <svg
                        className="w-4 h-4 fill-current"
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </li>
                </ul>
              </nav>
            </span>
          </div>
          <div className="flex justify-end items-center space-x-3">
            <button className="px-4 py-2 text-white font-bold bg-blue-600">
              <Link to={"/dashboard/invoices/import"}> EXPORT TO CSV</Link>
            </button>
            {invoices.length > 0 && (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
