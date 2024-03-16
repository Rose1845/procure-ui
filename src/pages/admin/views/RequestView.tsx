/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosApi } from "../../../api";
import { PurchaseRequest } from "../types";

const RequestView = () => {
  const { id } = useParams();
  const [request, setRequest] = React.useState<PurchaseRequest>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchCategory = async () => {
      try {
        const response = await axiosApi.get(`/purchase-request/${id}`, {
          signal: abortController.signal,
        });
        const categoryData = response.data;
        setRequest(categoryData);
        console.log("request retrieved successfully", categoryData);
      } catch (error) {
        console.error("Error updating request:", error);
      }
    };

    fetchCategory();
    return () => {
      abortController.abort();
    };
  }, [id]);

  // Calculate subtotals for each supplier
  const subtotals: { [key: string]: number } = {};
  request?.itemDetails.forEach(itemDetail => {
    const supplierId = itemDetail.supplier.vendorId;
    const totalPrice = itemDetail.item.quantity * itemDetail.offerUnitPrice;
    subtotals[supplierId] = (subtotals[supplierId] || 0) + totalPrice;
  });

  return (
    <div className="container flex flex-col justify-center items-center mx-auto mt-8 py-16">
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <>
          <div>
            <div>
              <td className="px-4 py-3 text-xs">
                <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">
                  {request?.approvalStatus}
                </span>
              </td>
              <h2>request Name: {request?.purchaseRequestTitle}</h2>
              <h2>CreatedOn:{request?.dueDate}</h2>
              <h2>request PaymentType: {request?.termsAndConditions}</h2>
              <h2>Expires On: {request?.dueDate}</h2>
            </div>
          </div>
          <div className="container mx-auto pt-16 mr-60">
            <div className="w-full overflow-hidden rounded-lg shadow-xs">
              <div className="w-full overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase brequest-b dark:brequest-gray-700 bg-gray-50 dark:text-gray-400">
                      <th className="px-4 py-3">ItemName</th>
                      <th className="px-4 py-3">Quantity</th>
                      <th className="px-4 py-3">Unit Price</th>
                      <th className="px-4 py-3">Total Price</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y dark:divide-gray-500">
                    {request?.items.map((request, i) => (
                      <tr
                        key={i}
                        className="bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center text-sm">
                            <div>
                              <p className="font-semibold">
                                {request.itemName}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {request.quantity}
                        </td>
                        <td className="px-4 py-3 text-xs">
                          <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                            {request.unitPrice}{" "}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {request.totalPrice}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </>
      )}
    </div>
  );
};

export default RequestView;
