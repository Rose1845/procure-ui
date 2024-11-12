// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { ItemDetail, PurchaseRequest } from "../types";
// import useApi from "@/hooks/useApi";

// function PurchaseRequestComponent() {
//   const { axiosApi } = useApi();

//   const [requests, setRequests] = React.useState<PurchaseRequest[]>([]);
//   const [selectedRequestId, setSelectedRequestId] = useState<number | null>(
//     null
//   );
//   const [itemDetails, setItemDetails] = useState<ItemDetail[]>([]);

//   useEffect(() => {
//     fetchRequests()
//       .then((data) => setRequests(data))
//       .catch((error) => console.error("Error fetching requests:", error));
//   }, []);

//   const fetchRequests = async () => {
//     const response = await axiosApi.get("/purchase-request");
//     return response.data;
//   };

//   const fetchItemDetails = async (requestId: number) => {
//     const response = await axiosApi.get(
//       `/purchase-request-item-details/request-offer-details/${requestId}`
//     );
//     console.log("Item details:", response.data); // Add this line to check the data

//     setItemDetails(response.data);
//   };

//   const handleRequestClick = (requestId: number) => {
//     if (selectedRequestId === requestId) {
//       setSelectedRequestId(null); // Toggle off if already selected
//     } else {
//       setSelectedRequestId(requestId);
//       fetchItemDetails(requestId);
//     }
//   };

//   return (
//     <div className="py-16">
//       <div className="flex justify-end">
//         <button className="px-4 py-2 bg-blue-600 text-white">
//           <Link to={"/dashboard/purchase-request/add-request"}>
//             Add Purchase Request
//           </Link>
//         </button>
//       </div>
//       <div className="max-w-7xl mx-auto pt-16 ">
//         <div className="w-full overflow-hidden rounded-lg shadow-xs">
//           <div className="w-full overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400">
//                   <th className="px-4 py-3">Name</th>
//                   <th className="px-4 py-3">Number</th>
//                   <th className="px-4 py-3">Date Created</th>
//                   <th className="px-4 py-3">Due Date</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y dark:divide-gray-500">
//                 {requests.map((req, i) => (
//                   <tr
//                     key={i}
//                     className="bg-gray-50 hover:bg-gray-100  text-gray-700 dark:text-gray-400 cursor-pointer"
//                     onClick={() => handleRequestClick(req.purchaseRequestId)}
//                   >
//                     <td className="px-4 space-y-2 flex flex-col-reverse py-3 text-sm">
//                       <span> {req.purchaseRequestTitle}</span>
//                       <span
//                         className={` px-4 py-2 leading-tight text-neutral-950 rounded-full  ${
//                           req.approvalStatus === "COMPLETED"
//                             ? "bg-green-500 text-white"
//                             : req.approvalStatus === "FULLY_RECEIVED"
//                             ? "bg-purple-500 text-white"
//                             : req.approvalStatus === "ISSUED"
//                             ? "bg-gray-500 text-white"
//                             : req.approvalStatus === "REJECT"
//                             ? "bg-red-500 text-white"
//                             : req.approvalStatus === "PENDING"
//                             ? "bg-green-500 text-white"
//                             : req.approvalStatus === "IN_DELIVERY"
//                             ? "bg-blue-500 text-white"
//                             : "bg-blue-600 text-white" // Default color for other statuses
//                         }`}
//                       >
//                         {req.approvalStatus}{" "}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3 text-sm">
//                       {" "}
//                       {new Date(req.createdAt).toLocaleString()}
//                     </td>
//                     <td className="px-4 py-3 text-sm">
//                       {new Date(req.dueDate).toLocaleString()}
//                     </td>
//                     <div className="py-4">
//                       <h2 className="text-lg font-semibold">
//                         Item Details Status
//                       </h2>
//                       <ul>
//                         {req.itemDetails?.map((item, index) => (
//                           <li key={index}>
//                             {item.supplier.name}: {item.quoteStatus}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   </tr>
//                 ))}
//                 {selectedRequestId && (
//                   <div className="py-16 max-w-7xl mx-auto pt-16">
//                     <h2 className="text-lg font-semibold">
//                       Item Details Status
//                     </h2>
//                     <ul>
//                       {itemDetails.map((item, index) => (
//                         <li key={index}>
//                           {item.supplier.name}: {item.quoteStatus}
//                         </li>
//                       ))}
//                       <div className="flex flex-row space-x-3 py-3 text-sm">
//                         <div>
//                           <Link
//                             className="uppercase px-4 py-3 text-xl text-white bg-sky-600 rounded-full"
//                             to={`/dashboard/quotes/tco_evaluation/${selectedRequestId}`}
//                           >
//                             compar tco
//                           </Link>
//                         </div>
//                         <div>
//                           <Link
//                             className="uppercase px-4 py-3 text-xl text-white bg-sky-600 rounded-full"
//                             to={`/dashboard/quotes/compare_offers/${selectedRequestId}`}
//                           >
//                             Compare Offers
//                           </Link>
//                         </div>
//                       </div>
//                     </ul>
//                   </div>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PurchaseRequestComponent;

import React from "react";
import { ItemDetail, PurchaseRequest } from "../types";
import useApi from "@/hooks/useApi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function PurchaseRequest() {
  const { axiosApi } = useApi();

  const [orders, setOrders] = React.useState<PurchaseRequest[]>([]);
  const [page, setPage] = React.useState<number>(0);
  const [totalPages, setTotalPages] = React.useState<number>(0);
  const [totalItems, setTotalItems] = React.useState<number>(0);
  const [selectedApprovalStatus, setSelectedApprovalStatus] = React.useState<
    string | null
  >(null);
  const [selectedRequestId, setSelectedRequestId] = React.useState<
    number | null
  >(null);
  const [itemDetails, setItemDetails] = React.useState<ItemDetail[]>([]);

  const pageSize = 5;
  const [sortBy, setSortBy] = React.useState<string>("createdAt"); // Default sort by createdAt
  const [sortDirection, setSortDirection] = React.useState<string>("desc"); // Default sort direction
  const [searchParams, setSearchParams] = React.useState<{
    purchaseRequestTitle?: string;
    startDate?: string;
    endDate?: string;
  }>({});

  React.useEffect(() => {
    fetchOrders();
  }, [page, pageSize, selectedApprovalStatus, sortBy, sortDirection]); // Added selectedSupplier to useEffect dependencies

  const fetchItemDetails = async (requestId: number) => {
    const response = await axiosApi.get(
      `/purchase-request-item-details/request-offer-details/${requestId}`
    );
    console.log("Item details:", response.data); // Add this line to check the data

    setItemDetails(response.data);
  };

  const handleRequestClick = (requestId: number) => {
    if (selectedRequestId === requestId) {
      setSelectedRequestId(null); // Toggle off if already selected
    } else {
      setSelectedRequestId(requestId);
      fetchItemDetails(requestId);
    }
  };
  const handleApprovalStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedApprovalStatus(event.target.value);
  };

  const fetchOrders = async () => {
    try {
      let url = `/purchase-request/paginations?page=${page}&size=${pageSize}`;

      if (selectedApprovalStatus) {
        url += `&approvalStatus=${selectedApprovalStatus}`;
      }
      url += `&sortField=${sortBy}&sortDirection=s${sortDirection}`;
      if (searchParams.startDate) {
        url += `&startDate=${searchParams.startDate}`;
      }
      if (searchParams.purchaseRequestTitle) {
        url += `&purchaseRequestTitle=${searchParams.purchaseRequestTitle}`;
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
      setOrders(content);
      setTotalPages(total);
      setTotalItems(totalItems);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSortChange = (column: string) => {
    if (column === sortBy) {
      // Toggle sort direction if the same column is clicked again
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set new sort column and default direction to ascending
      setSortBy(column);
      setSortDirection("asc");
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
    fetchOrders();
  };

  const clearSearchParams = () => {
    setSearchParams({
      purchaseRequestTitle: "",
      startDate: "",
      endDate: "",
    });
    fetchOrders();
  };
  const sendToSupplier = async (id: number) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axiosApi.get(
        `/purchase-request/send-offer-to-suppliers/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      toast.success("sent successfully");
      console.log("Response from backend:", response.data);
    } catch (error) {
      toast.error("An error occurred while sending order to supplier");
      console.error("Error sending order to supplier:", error);
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
        <button className="bg-blue-600 text-white px-4 py-2">
          <Link to={"/dashboard/purchase-request/add-request"}>
            Create Request
          </Link>
        </button>
      </div>
      <div className="max-w-7xl  pt-16 flex flex-row space-x-4">
        <div>
          <div className="flex flex-col justify-start">
            <div>
              <h3>Search...</h3>
              <input
                type="text"
                name="purchaseRequestTitle"
                value={searchParams.purchaseRequestTitle || ""}
                onChange={handleSearchParamsChange}
                placeholder="Search by order title..."
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
                id="approvalStatus"
                value={selectedApprovalStatus || ""}
                onChange={handleApprovalStatusChange}
                className="bg-white border border-gray-300 rounded px-3 py-1"
              >
                <option selected value="">
                  ALL APPROVAL STATUS
                </option>
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
        </div>
        <div className="max-w-7xl mx-auto pt-16 ">
          <div className="w-full overflow-hidden rounded-lg shadow-xs">
            <div className="flex flex-row space-x-3">
              <h3 className="px-4 py-3">Sort By:</h3>
              <th
                className="px-4 py-3 cursor-pointer"
                onClick={() => handleSortChange("purchaseRequestTitle")}
              >
                Purchase Request
              </th>

              <th
                className="px-4 py-3 cursor-pointer"
                onClick={() => handleSortChange("approvalStatus")}
              >
                Status
              </th>
              <th
                className="px-4 py-3 cursor-pointer"
                onClick={() => handleSortChange("createdAt")}
              >
                Last Edited
              </th>
            </div>
            <div className="w-full ">
              <table className="w-full">
                <thead className="">
                  <tr className="">
                    <th className="px-4 py-3">Purchase Request</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Last Edited</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y dark:divide-gray-500">
                  {orders.length == 0 ? (
                    <tr className="text-gray-700 dark:text-gray-400">
                      <td colSpan={5} className="px-4 py-3 text-center">
                        No purchase orders found
                      </td>
                    </tr>
                  ) : (
                    orders.map((order, i) => (
                      <>
                        <tr
                          key={i}
                          onClick={() =>
                            handleRequestClick(order.purchaseRequestId)
                          }
                          className="bg-gray-50 hover:bg-gray-100  text-gray-700 dark:text-gray-400"
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center text-sm">
                              <div>
                                <p className="font-semibold">
                                  {order.purchaseRequestTitle}
                                </p>
                              </div>
                            </div>
                          </td>
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
                          {order.approvalStatus == "PENDING" && (
                            <td className="px-4 py-3 text-xs">
                              <button
                                className="bg-green-600 uppercase px-4 py-2 text-white"
                                onClick={() =>
                                  sendToSupplier(order.purchaseRequestId)
                                }
                              >
                                Send to suppliers
                              </button>
                            </td>
                          )}
                          {order.approvalStatus == "ISSUED" && (
                            <td className="px-4 py-3 text-xs">
                              <button
                                className="bg-blue-600 uppercase px-4 py-2 text-white"
                                onClick={() =>
                                  sendToSupplier(order.purchaseRequestId)
                                }
                              >
                                RESEND EMAIL TO SUPPLIERS
                              </button>
                            </td>
                          )}
                        </tr>
                        <tr></tr>
                      </>
                    ))
                  )}
                  <tr className=" dark:text-gray-400">
                    {selectedRequestId && (
                      <div className="py-16 max-w-7xl mx-auto pt-16">
                        <h2 className="text-lg font-semibold">
                          Item Details Status
                        </h2>
                        <ul>
                          {itemDetails.map((item, index) => (
                            <li key={index}>
                              {item.supplier.name}: {item.quoteStatus}
                            </li>
                          ))}
                          <div className="flex w-full flex-row space-x-3 py-3 text-sm">
                            <div className="w-96">
                              <Link
                                className="uppercase px-4 py-3 text-xl text-white bg-sky-600 rounded-full"
                                to={`/dashboard/quotes/tco_evaluation/${selectedRequestId}`}
                              >
                                compare tco
                              </Link>
                            </div>
                            <div className="w-96">
                              <Link
                                className="uppercase px-4 py-3 text-xl text-white bg-sky-600 rounded-full"
                                to={`/dashboard/quotes/compare_offers/${selectedRequestId}`}
                              >
                                Compare Offers
                              </Link>
                            </div>
                          </div>
                        </ul>
                      </div>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
            {orders.length > 7 && (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchaseRequest;
