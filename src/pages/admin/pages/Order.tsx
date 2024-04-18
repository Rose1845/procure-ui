import React from "react";
import { PurchaseOrder, Supplier } from "../types";
import { axiosApi } from "../../../api";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import JSZip from 'jszip';

function Order() {
  const navigate = useNavigate();
  const [orders, setOrders] = React.useState<PurchaseOrder[]>([]);
  const [page, setPage] = React.useState<number>(0);
  const [totalPages, setTotalPages] = React.useState<number>(0);
  const [totalItems, setTotalItems] = React.useState<number>(0);
  const [suppliers, setSuppliers] = React.useState<Supplier[]>([]);
  const [selectedApprovalStatus, setSelectedApprovalStatus] = React.useState<string | null>(null);
  const [selectedSupplier, setSelectedSupplier] = React.useState<string | null>(null); // Added state for selected supplier
  const pageSize = 5;
  React.useEffect(() => {
    fetchOrders();
    fetchSuppliers()
  }, [page, pageSize, selectedSupplier, selectedApprovalStatus]); // Added selectedSupplier to useEffect dependencies
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
  const fetchOrders = async () => {
    try {
      let url = `/purchase-order/paginations?page=${page}&size=${pageSize}`;
      if (selectedSupplier) {
        url += `&supplierId=${selectedSupplier}`;
      }
      if (selectedApprovalStatus) {
        url += `&approvalStatus=${selectedApprovalStatus}`;
      }
      const response = await axiosApi.get(url);
      const { content, totalPages: total, totalElements: totalItems } = response.data;
      setOrders(content);
      setTotalPages(total);
      setTotalItems(totalItems);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const handleSupplierChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSupplier(event.target.value);
  };
  const handleApprovalStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedApprovalStatus(event.target.value);
  };

  const generatePDFForOrder = async (orderId: number) => {
    try {
      const response = await axiosApi.get(`/purchase-order/${orderId}/report`, {
        /**
         * 
         */
        responseType: "arraybuffer",

      });

      const blob = new Blob([response.data], { type: 'application/pdf' });

      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.download = `order_${orderId}_report.pdf`;

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

  const generateAndDownloadZip = async (orders: PurchaseOrder[]) => {
    const zip = new JSZip();

    // Iterate over each order and generate PDF report
    for (const order of orders) {
      try {
        const response = await axiosApi.get(`/purchase-order/${order.purchaseOrderId}/report`, {
          responseType: 'arraybuffer',
        });

        const blob = new Blob([response.data], { type: 'application/pdf' });
        zip.file(`order_${order.purchaseOrderId}_report.pdf`, blob);
      } catch (error) {
        console.error(`Error generating PDF for order ${order.purchaseOrderId}:`, error);
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

  const handleEdit = async (id: number) => {
    // Redirect or open a modal for editing based on the id
    navigate(`/dashboard/order/edit/${id}`);
    console.log(`Editing Order with ID: ${id}`);
  };

  // const handleDelete = async (id: number) => {
  //   try {
  //     // Send a DELETE request to delete the supplier with the given ID
  //     await axiosApi.delete(`/purchase-order/${id}`);
  //     toast.success("deleted succesfuly");
  //     console.log(`Order with ID ${id} deleted successfully`);
  //     fetchOrders();
  //   } catch (error) {
  //     console.error(`Error deleting supplier with ID ${id}:`, error);
  //   }
  // };
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const startIndex = page * pageSize + 1;
  const endIndex = Math.min((page + 1) * pageSize, totalItems);

  return (
    <div className="max-w-7xl mx-auto pt-16 ">
      <div className="flex justify-end">
        <div className="relative inline-block text-left">
          <button className="px-4 py-2 bg-blue-600 text-white">
            Create Purchase Order
          </button>
          <div
            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <div className="py-1" role="none">
              <Link
                to="/dashboard/order/add_order"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                id="menu-item-0"
              >
                Standard Purchase Order
              </Link>
              <Link
                to="/dashboard/order/add_order_from_contract"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                id="menu-item-1"
              >
                Create Order From Contract
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row space-x-4">
        <div className="flex flex-col justify-start">
          <div>Filter</div>
          <div className="flex flex-col space-y-3">
            <select
              id="supplier"
              value={selectedSupplier || ""}
              onChange={handleSupplierChange}
              className="bg-white border border-gray-300 rounded px-3 py-1"
            >
              <option value="">All Suppliers</option>
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
              className="bg-white border border-gray-300 rounded px-3 py-1 ml-3"
            >
              <option value="">All Approval Status</option>
              <option value="ISSUED">ISSUED</option>
              <option value="FULLY_RECEIVED">FULLY RECEIVED</option>
              <option value="CLOSED">CLOSED</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="REJECT">REJECT</option>
              <option value="IN_DELIVERY">IN_DELIVERY</option>
              <option value="PENDING">PENDING</option>
            </select>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-16 ">
          <div className="w-full overflow-hidden rounded-lg shadow-xs">
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400">
                    <th className="px-4 py-3">Purchase Orders</th>
                    <th className="px-4 py-3">Payment Type</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Last Edited</th>
                    <th className="px-4 py-3">Actions</th>

                  </tr>
                </thead>
                <tbody className="bg-white divide-y dark:divide-gray-500">
                  {orders.length === 0 ? (<tr className="text-gray-700 dark:text-gray-400">
                    <td colSpan={5} className="px-4 py-3 text-center">
                      No purchase orders found
                    </td>
                  </tr>) : (
                    orders.map((order, i) => (
                      <>
                        <tr
                          key={i}
                          className="bg-gray-50  text-gray-700 dark:text-gray-400"
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center text-sm">
                              <div>
                                <p className="font-semibold">
                                  {order.purchaseOrderTitle}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">{order.paymentType}</td>
                          <td className="px-4 py-3 text-xs">
                            <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full  ">
                              {order.approvalStatus}{" "}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {new Date(order.createdAt).toLocaleString()}
                          </td>
                          <td className="px-4 py-3 space-x-5 text-sm">
                            <button
                              className="text-blue-600 hover:underline"
                              onClick={() => handleEdit(order.purchaseOrderId)}
                            >
                              Edit
                              <FaEdit className="text-xl text-gray-900" />
                            </button>
                            {" | "}
                            {/* <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleDelete(order.purchaseOrderId)}
                      >
                        Delete
                        <FaTrashAlt />
                      </button> */}
                            <button>
                              <Link
                                className="bg-gray-50   text-gray-700 dark:text-gray-400"
                                to={`/dashboard/order/view/${order.purchaseOrderId}`}
                              >
                                View
                              </Link>
                            </button>
                          </td>
                          <td className="px-4 mb-4 py-3 text-sm">
                            <button
                              className="bg-blue-600 text-white px-4 py-2 rounded-md"
                              onClick={() => generatePDFForOrder(order.purchaseOrderId)}
                            >
                              Generate Report
                            </button>
                          </td>
                        </tr>
                      </>
                    ))
                  )}

                </tbody>
              </table>
            </div>
            {
              orders.length > 0 && (
                <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400">
                  <span className="flex suppliers-center col-span-3">
                    Showing {startIndex}-{endIndex} of {totalItems}
                  </span>
                  <span className="col-span-2"></span>
                  <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                    <nav aria-label="Table navigation">
                      <ul className="inline-flex suppliers-center">
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
                            </svg>                      </button>
                        </li>
                        {/* Render page numbers */}
                        {/* Example: */}
                        {[1, 2, 3, 4, 5].map((pageNumber) => (
                          <li key={pageNumber}>
                            <button
                              className={`px-3 py-1 rounded-md ${page + 1 === pageNumber ? "bg-blue-600 text-white" : ""
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
              )
            }

          </div>
          {orders.length > 0 && (
            <div className="flex justify-end flex-row space-x-3 mb-4">
              <div>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md"
                  onClick={() => generateAndDownloadZip(orders)}
                >
                  EXPORT TO PDF
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default Order;