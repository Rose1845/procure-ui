/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PurchaseRequest } from "../types";
import useApi from "@/hooks/useApi";

const CompareOffers = () => {
    const { axiosApi } = useApi()

    const { id } = useParams();
    const [request, setRequest] = React.useState<PurchaseRequest>();
    const [isLoading, ] = useState<boolean>(false);

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
        <div className="container mx-auto mt-8 py-16 mr-16">
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {request && (
                        <>
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold">{request.purchaseRequestTitle}</h2>
                                <p><strong>Created On:</strong> {request.dueDate}</p>
                                <p><strong>Payment Type:</strong> {request.termsAndConditions}</p>
                                <p><strong>Expires On:</strong> {request.dueDate}</p>
                            </div>
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold">Items</h3>
                                <ul>
                                    {request.items.map(item => (
                                        <li key={item.itemId} className="mb-4">
                                            <p><strong>Item Name:</strong> {item.itemName}</p>
                                            <p><strong>Item Number:</strong> {item.itemNumber}</p>
                                            <p><strong>Description:</strong> {item.itemDescription}</p>
                                            <p><strong>Quantity:</strong> {item.quantity}</p>
                                            <p><strong>Unit Price:</strong> {item.unitPrice}</p>
                                            <p><strong>Total Price:</strong> {item.totalPrice}</p>
                                            <h4 className="text-md font-semibold mb-2">CURRENT OFFERS - COMPARED BY SUPPLIER
                                            </h4>
                                            <table className="w-full border-collapse">
                                                <thead>
                                                    <tr>
                                                        <th className="border border-gray-300 px-4 py-2">Supplier</th>
                                                        <th className="border border-gray-300 px-4 py-2">Unit Price</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {request.itemDetails
                                                        .filter(itemDetail => itemDetail.item.itemId === item.itemId)
                                                        .map(itemDetail => (
                                                            <tr key={itemDetail.id}>
                                                                <td className="border border-gray-300 px-4 py-2">{itemDetail.supplier.name}</td>
                                                                <td className="border border-gray-300 px-4 py-2">{itemDetail.offerUnitPrice}</td>
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </table>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};
export default CompareOffers;
