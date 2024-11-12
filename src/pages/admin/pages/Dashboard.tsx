import React from "react";
import { PurchaseOrder } from "../types";
import PurchaseOrderBarGraph from "../components/order/PurchaseOrderBarGraph";
import ContractsBarGraph from "../components/contract/ContractsBarGraph";
import useApi from "@/hooks/useApi";

function Dashboard() {
  const { axiosApi } = useApi();
  const [orders, setOrders] = React.useState<PurchaseOrder[]>([]);

  React.useEffect(() => {
    fetchOrders()
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);
  const fetchOrders = async () => {
    const response = await axiosApi.get("/purchase-order/latest");
    const order = response.data.content;
    console.log(order, "orders");
    return order;
  };

  return (
    <div className="max-w-7xl mx-auto pt-16 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
        <div className="bg-white shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 text-neutral-950 font-medium group">
          <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
            <svg
              width="30"
              height="30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
          </div>
          <div className="text-right">
            <button className="text-xl bg-orange-400 rounded-sm px-2 py-1">
              All Approved
            </button>
            <p>Suppliers</p>
          </div>
        </div>
      </div>
      <div className="flex  justify-between flex-row space-x-4">
        <div className="shadow">
          <PurchaseOrderBarGraph />
        </div>
        <div className="shadow">
          <ContractsBarGraph />
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-16 ">
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <p> 5 Latest Purchase Orders</p>
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400">
                  <th className="px-4 py-3">Purchase Orders</th>
                  <th className="px-4 py-3">Payment Type</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Created On</th>
                  <th className="px-4 py-3">Last Edited</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-500">
                {orders.map((order, i) => (
                  <tr
                    key={i}
                    className="bg-gray-50 hover:bg-gray-100  text-gray-700 dark:text-gray-400"
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
                      {new Date(order.updatedAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
