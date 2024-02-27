import { axiosApi } from "@/api";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { PurchaseRequest } from "../../types";

const CreateOffer = () => {
  const { id } = useParams();
  const [request, setrequest] = React.useState<PurchaseRequest>();

  useEffect(() => {
    const abortController = new AbortController();
    const fetchCategory = async () => {
      try {
        const response = await axiosApi.get(`/purchase-request/${id}`, {
          signal: abortController.signal,
        });
        const categoryData = response.data;
        setrequest(categoryData);
        console.log("request retrived successfully");
      } catch (error) {
        console.error("Error updating request:", error);
      }
    };

    fetchCategory();
    return () => {
      abortController.abort();
    };
  }, [id]);

  const fetchOfferItems = async (supplierId: string) => {
    try {
      const response = await axiosApi.patch(
        `/purchase-request/${id}/suppliers/${supplierId}/offer-items`,
        [{ offerUnitPrice: 0 }]
      );
      const offerItems = response.data;
      console.log("Offer Items retrieved successfully", offerItems);
      // Handle the offerItems data as needed
    } catch (error) {
      console.error("Error fetching offer items:", error);
    }
  };

  return (
    <div className="container flex flex-col justify-center items-center mx-auto mt-8 py-16">
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
      <div>
        {request?.suppliers.map((request, i) => (
          <div key={i}>
            <h2>{request.name}</h2>
          </div>
        ))}
      </div>
      <div>
        <div className="max-w-7xl mx-auto pt-16 ">
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
                            <p className="font-semibold">{request.itemName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{request.quantity}</td>
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
      </div>
    </div>
  );
};

export default CreateOffer;
