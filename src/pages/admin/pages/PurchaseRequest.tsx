import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ItemDetail, PurchaseRequest } from "../types";
import useApi from "@/hooks/useApi";

function PurchaseRequestComponent() {
  const { axiosApi } = useApi()

  const [requests, setRequests] = React.useState<PurchaseRequest[]>([]);
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);
  const [itemDetails, setItemDetails] = useState<ItemDetail[]>([]);

  useEffect(() => {
    fetchRequests()
      .then((data) => setRequests(data))
      .catch((error) => console.error("Error fetching requests:", error));
  }, []);

  const fetchRequests = async () => {
    const response = await axiosApi.get("/purchase-request");
    return response.data;
  };

  const fetchItemDetails = async (requestId: number) => {
    const response = await axiosApi.get(`/purchase-request-item-details/request-offer-details/${requestId}`);
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
  
  return (
    <div className="py-16">
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-blue-600 text-white">
          <Link to={"/dashboard/purchase-request/add-request"}>Add Purchase Request</Link>
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
                {requests.map((req, i) => (
                  <tr
                    key={i}
                    className="bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400 cursor-pointer"
                    onClick={() => handleRequestClick(req.purchaseRequestId)}
                  >
                    <td className="px-4 flex flex-col-reverse py-3 text-sm">
                      <span> {req.purchaseRequestTitle}</span>
                      <div>
                        <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                          {req.createdBy}{" "}
                        </span>{" "}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {" "}
                      {new Date(req.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {new Date(req.dueDate).toLocaleString()}
                    </td>
                    <div className="py-4">
                      <h2 className="text-lg font-semibold">Item Details Status</h2>
                      <ul>
                        {req.itemDetails?.map((item, index) => (
                          <li key={index}>
                            {item.supplier.name}: {item.quoteStatus}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </tr>
                ))}
                {selectedRequestId && (
                  <div className="py-16 max-w-7xl mx-auto pt-16">
                    <h2 className="text-lg font-semibold">Item Details Status</h2>
                    <ul>
                      {itemDetails.map((item, index) => (
                        <li key={index}>
                          {item.supplier.name}: {item.quoteStatus}
                        </li>
                      ))}
                      <div className="flex flex-row space-x-3 py-3 text-sm">
                        <div>
                          <Link className="uppercase px-4 py-3 text-xl text-white bg-sky-600 rounded-full" to={`/dashboard/quotes/tco_evaluation/${selectedRequestId}`}>compar tco</Link>
                        </div>
                        <div>
                          <Link className="uppercase px-4 py-3 text-xl text-white bg-sky-600 rounded-full" to={`/dashboard/quotes/compare_offers/${selectedRequestId}`}>Compare Offers</Link>
                        </div>
                      </div>
                    </ul>
                  </div>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    
    </div>
  );
}

export default PurchaseRequestComponent;
