/* eslint-disable @typescript-eslint/no-unused-vars */
import { axiosApi } from "@/api";
import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { PurchaseRequest } from "../../types";


type OfferItem = {
  item: {
    itemId: string;
  };
  offerUnitPrice: number;
}
const CreateOffer = () => {
  const { id } = useParams();
  const [isLoading, setIsloading] = React.useState(false);
  const [request, setRequest] = React.useState<PurchaseRequest>();
  const [offers, setOffers] = React.useState<OfferItem[]>([]);
  const [queryParams] = useSearchParams()
  const supplierId = queryParams.get("supplierId")
  const handleItemChange = (index: number, update: OfferItem) => {

    const item = offers[index]
    console.log({ original: offers });

    if (item) {
      const temp = { ...item, ...update }
      const arrayTemp = offers
      arrayTemp[index] = temp
      setOffers(_ => [...arrayTemp])
    }
  }

  useEffect(() => {
    const abortController = new AbortController();
    const fetchCategory = async () => {
      try {
        const response = await axiosApi.get(`/purchase-request/${id}`, {
          signal: abortController.signal,
        });
        const categoryData = response.data;
        setRequest(categoryData);
        console.log("request retrieved successfully");
      } catch (error) {
        console.error("Error updating request:", error);
      }
    };

    fetchCategory();
    return () => {
      abortController.abort();
    };
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(supplierId, "suplier");
    e.preventDefault()

    const purchaseRequestId = id;
    setIsloading(true)
    try {
      const url = `/purchase-request/${purchaseRequestId}/edit2-offer-unit-prices2?supplierId=${supplierId}`;
      const response = await axiosApi.patch(url, offers);
      const offer1 = response.data;
      console.log(offer1, "offer request");
      return offer1;
    } catch (error) {
      console.log(error);

    } finally {
      setIsloading(false)
    }
  }
  useEffect(() => {
    const updatedItemDetails =
      request?.items.map((item) => ({
        item: {
          itemId: item.itemId,
        },
        offerUnitPrice: 0,
      })) || [];
    setOffers(prev => [...prev, ...updatedItemDetails]);
  }, [request?.items]);
  console.log({ supplierId });

  return (
    <div className="flex flex-col  mt-8 py-16">
      <div>
        <div className="flex flex-col space-y-3">
          <td className="px-4 py-3 text-xs">
            <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">
              {request?.approvalStatus}
            </span>
          </td>
          <h2>Request Name: {request?.purchaseRequestTitle}</h2>
          <h2>Created On:{request?.dueDate}</h2>
          <h2>Request PaymentType: {request?.termsAndConditions}</h2>
          <h2>Expires On: {request?.dueDate}</h2>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
      >
        <div className="pt-16 ">
          <div className="w-full overflow-hidden rounded-lg shadow-xs">
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase brequest-b dark:brequest-gray-700 bg-gray-50 dark:text-gray-400">
                    <th className="px-4 py-3">ItemName</th>
                    <th className="px-4 py-3">Quantity</th>
                    <th className="px-4 py-3">Unit Price</th>
                    <th className="px-4 py-3">Total Price</th>
                    <th className="px-4 py-3">Offer Unit Price</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y dark:divide-gray-500">
                  {request?.items.map((item, idx) => (
                    <tr
                      key={idx}
                      className="bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center text-sm">
                          <div>
                            <p className="font-semibold">{item.itemName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{item.quantity}</td>
                      <td className="px-4 py-3 text-xs">
                        <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                          {item.unitPrice}{" "}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {item.totalPrice}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <input
                          type="number"
                          value={offers[idx]?.offerUnitPrice || ""}
                          onChange={(e) => {
                            handleItemChange(idx, { ...offers[idx], offerUnitPrice: Number(e.target.value) })
                          }}
                          className="px-2 py-1 w-full border rounded-md"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <button
            disabled={isLoading}
            type="submit"
            className={`bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none ${isLoading ? "bg-opacity-45 bg-red-900 cursor-not-allowed" : ""
              }`}
          >
            {isLoading ? "Submitting..." : 'Make Offer'}
          </button>
        </div>

      </form>
    </div>
  );
};



export default CreateOffer;
