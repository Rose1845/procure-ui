import React from "react";
import { Link } from "react-router-dom";
import useApi from "@/hooks/useApi";
import { PurchaseRequisition } from "../../types";

function ApproveRequisition() {
  const { axiosApi } = useApi();

  const [requisitions, setRequisitions] = React.useState<PurchaseRequisition[]>(
    []
  );
  React.useEffect(() => {
    fetchRequisitions()
      .then((data) => setRequisitions(data))
      .catch((error) => console.error("Error fetching requisition:", error));
  }, []);
  const fetchRequisitions = async () => {
    const response = await axiosApi.get("/purchase-requisition");
    const requisition = response.data;
    console.log(requisition, "requisitions");
    console.log(requisitions, "reqesss");
    return requisition;
  };
  return (
    <div className="py-16">
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-blue-600 text-white">
          <Link to={"/dashboard/purchase-requisition/add_requisition"}>
            {" "}
            Add Purchase Requisition
          </Link>
        </button>
      </div>
      <div className="max-w-7xl mx-auto pt-16 ">
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Number</th>
                  <th className="px-4 py-3">Date Created</th>
                  <th className="px-4 py-3">Due Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-500">
                {requisitions.map((requi, i) => (
                  <tr
                    key={i}
                    className="bg-gray-50 hover:bg-gray-100  text-gray-700 dark:text-gray-400"
                  >
                    <td className="px-4 flex space-y-2 flex-col-reverse py-3 text-sm">
                      <span> {requi.requisitionTitle}</span>
                      <span
                        className={` px-4 py-2 leading-tight text-neutral-950 rounded-full  ${
                          requi.approvalStatus === "COMPLETED"
                            ? "bg-green-500 text-white"
                            : requi.approvalStatus === "FULLY_RECEIVED"
                            ? "bg-purple-500 text-white"
                            : requi.approvalStatus === "ISSUED"
                            ? "bg-gray-500 text-white"
                            : requi.approvalStatus === "REJECT"
                            ? "bg-red-500 text-white"
                            : requi.approvalStatus === "PENDING"
                            ? "bg-green-500 text-white"
                            : requi.approvalStatus === "IN_DELIVERY"
                            ? "bg-blue-500 text-white"
                            : "bg-blue-600 text-white" // Default color for other statuses
                        }`}
                      >
                        {requi.approvalStatus}{" "}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{requi.requisitionId}</td>
                    <td className="px-4 py-3 text-sm">
                      {" "}
                      {new Date(requi.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {new Date(requi.dateNeeded).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 ">
            <span className="flex items-center col-span-3">
              {" "}
              Showing 21-30 of 100{" "}
            </span>
            <span className="col-span-2"></span>
            <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
              <nav aria-label="Table navigation">
                <ul className="inline-flex items-center">
                  <li>
                    <button
                      className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                      aria-label="Previous"
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
                      </svg>
                    </button>
                  </li>
                  <li>
                    <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                      1
                    </button>
                  </li>
                  <li>
                    <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                      2
                    </button>
                  </li>
                  Order
                  <li>
                    <button className="px-3 py-1 text-white dark:text-gray-800 transition-colors duration-150 bg-blue-600 dark:bg-gray-100 border border-r-0 border-blue-600 dark:border-gray-100 rounded-md focus:outline-none focus:shadow-outline-purple">
                      3
                    </button>
                  </li>
                  <li>
                    <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                      4
                    </button>
                  </li>
                  <li>
                    <span className="px-3 py-1">...</span>
                  </li>
                  <li>
                    <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                      8
                    </button>
                  </li>
                  <li>
                    <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                      9
                    </button>
                  </li>
                  <li>
                    <button
                      className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                      aria-label="Next"
                    >
                      <svg
                        className="w-4 h-4 fill-current"
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </li>
                </ul>
              </nav>
            </span>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default ApproveRequisition;
