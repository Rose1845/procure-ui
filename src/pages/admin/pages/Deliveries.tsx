import React from "react";
import { Delivery, PurchaseOrder } from "../types";
import { Link } from "react-router-dom";
import useApi from "@/hooks/useApi";

function Deliveries() {
  const { axiosApi } = useApi();

  const [orders, setOrders] = React.useState<PurchaseOrder[]>([]);
  const [page, setPage] = React.useState<number>(0);
  const [totalPages, setTotalPages] = React.useState<number>(0);
  const [totalItems, setTotalItems] = React.useState<number>(0);
  const [selectedOrder, setSelectedOrder] =
    React.useState<PurchaseOrder | null>(null);
  const [delivery, setDelivery] = React.useState<Delivery | null>(null);

  const pageSize = 5;
  React.useEffect(() => {
    fetchOrders();
  }, [page]);

  const fetchOrders = async () => {
    try {
      const response = await axiosApi.get(
        `/purchase-order/paginate?page=${page}&size=${pageSize}`
      );
      const {
        content,
        totalPages: total,
        totalElements: totalItems,
      } = response.data;
      setOrders(content);
      setTotalPages(total);
      setTotalItems(totalItems);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const handleViewDeliveries = async (id: number) => {
    try {
      const response = await axiosApi.get(`/deliveries/order-delivery/${id}`);
      setDelivery(response.data);
      setSelectedOrder(response.data);
    } catch (error) {
      console.error("Error fetching delivery details:", error);
    }
  };

  const renderDeliveryDetails = () => {
    if (!delivery || Object.keys(delivery).length === 0) {
      return <p>No deliveries found for this order.</p>;
    }
  };
  // R
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const startIndex = page * pageSize + 1;
  const endIndex = Math.min((page + 1) * pageSize, totalItems);

  return (
    <div className="max-w-7xl mx-auto pt-16 ">
      <div className="max-w-7xl mx-auto pt-16 ">
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 ">
                  <th className="px-4 py-3">Purchase Orders</th>
                  <th className="px-4 py-3">Payment Type</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Last Edited</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-500">
                {orders.map((order, i) => (
                  <>
                    <tr
                      key={i}
                      onClick={() =>
                        handleViewDeliveries(order.purchaseOrderId)
                      }
                      className="bg-gray-50 hover:bg-gray-100  text-gray-700 "
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
                        <span
                          className={` px-4 py-2 leading-tight text-neutral-950 rounded-full  ${
                            order.approvalStatus === "COMPLETED"
                              ? "bg-green-500 text-white"
                              : order.approvalStatus === "FULLY_RECEIVED"
                              ? "bg-purple-500 text-white"
                              : order.approvalStatus === "ISSUED"
                              ? "bg-gray-500 text-white"
                              : order.approvalStatus === "REJECT"
                              ? "bg-red-500 text-white"
                              : order.approvalStatus === "PENDING"
                              ? "bg-green-500 text-white"
                              : order.approvalStatus === "IN_DELIVERY"
                              ? "bg-blue-500 text-white"
                              : "bg-blue-600 text-white" // Default color for other statuses
                          }`}
                        >
                          {order.approvalStatus}{" "}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {new Date(order.createdAt).toLocaleString()}
                      </td>

                      <td className="px-4 py-3 text-sm">
                        {order.approvalStatus === "ISSUED" && (
                          <Link
                            to={`/dashboard/deliveries/add/${order.purchaseOrderId}`}
                            className="text-blue-600 bg-white  px-4 py-2 ring-2 hover:underline"
                          >
                            Add Delivery
                          </Link>
                        )}
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
            <div>
              {selectedOrder && (
                <div>
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs font-semibold tracking-wide text-left text-gray-900 uppercase border-b dark:border-gray-700 bg-white ">
                        <th className="px-4 py-3">Delivered Via</th>
                        <th className="px-4 py-3">Date Delivered</th>
                        <th className="px-4 py-3">Expected Arrival</th>
                        <th className="px-4 py-3">Date Received </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y dark:divide-gray-500">
                      <>
                        <tr className="bg-white   text-gray-900 ">
                          <td className="px-4 py-3">
                            <div className="flex items-center text-sm">
                              <div>
                                <p className="font-semibold">
                                  {delivery?.deliveredVia}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {delivery?.deliveryDate}
                          </td>
                          <td className="px-4 py-3 text-xs">
                            <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                              {delivery?.expectedOn}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {delivery?.receivedOn}
                          </td>

                          <td className="px-4 py-3 text-sm">
                            <Link
                              to={`/dashboard/delivery/view/${delivery?.id}`}
                              className="text-white uppercase bg-blue-600 px-4 py-2 hover:underline"
                            >
                              VIew Delivery SUMMARY
                            </Link>
                          </td>
                        </tr>
                      </>
                    </tbody>
                  </table>
                  {renderDeliveryDetails()}
                </div>
              )}
            </div>
          </div>

          <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 ">
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
        </div>
      </div>
    </div>
  );
}

export default Deliveries;
