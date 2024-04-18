import React from "react";
import { PurchaseOrder } from "../types";
import { axiosApi } from "../../../api";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

function Deliveries() {
  const [orders, setOrders] = React.useState<PurchaseOrder[]>([]);
  const [page, setPage] = React.useState<number>(0);
  const [totalPages, setTotalPages] = React.useState<number>(0);
  const [totalItems, setTotalItems] = React.useState<number>(0);
  const pageSize = 5;
  React.useEffect(() => {
    fetchOrders();
  }, [page]);

  const fetchOrders = async () => {
    try {
      const response = await axiosApi.get(`/purchase-order/paginations?page=${page}&size=${pageSize}`);
      const { content, totalPages: total, totalElements: totalItems } = response.data;
      setOrders(content);
      setTotalPages(total);
      setTotalItems(totalItems);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };



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
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-500">
                {orders.map((order, i) => (
                  <><tr
                    key={i}
                    className="bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400"
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
                      <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
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
                          className="text-blue-600 hover:underline"
                        >
                          Add Delivery
                          <FaEdit className="text-xl text-gray-900" />
                        </Link>
                      )}
                    </td>
                  </tr>

                  </>
                ))}
              </tbody>
            </table>
          </div>

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
        </div>
      </div>
    </div>
  );
}

export default Deliveries;
