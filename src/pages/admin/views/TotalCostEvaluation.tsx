import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosApi } from "../../../api";
import { PurchaseRequest } from "../types";
function TotalCostEvaluation() {
    const { id } = useParams();
    const [request, setRequest] = useState<PurchaseRequest>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const abortController = new AbortController();
        const fetchCategory = async () => {
            try {
                setIsLoading(true);
                const response = await axiosApi.get(`/purchase-request/${id}`, {
                    signal: abortController.signal,
                });
                setRequest(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error updating request:", error);
                setIsLoading(false);
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
        <div className="container mx-auto mt-8 py-16 mr-10">
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
                            <div>
                                <h3 className="text-lg font-semibold">CURRENT OFFERS - GROUPED BY SUPPLIER
                                </h3>
                                {Object.keys(subtotals).map(supplierId => (
                                    <div key={supplierId} className="mb-8">
                                        <h4 className="text-md font-semibold mb-2">Supplier: {request.suppliers.find(supplier => supplier.vendorId === supplierId)?.name}</h4>
                                        <table className="w-full border-collapse">
                                            <thead>
                                                <tr>
                                                    <th className="border border-gray-300 px-4 py-2">Item Name</th>
                                                    <th className="border border-gray-300 px-4 py-2">Quantity</th>
                                                    <th className="border border-gray-300 px-4 py-2">Unit Price</th>
                                                    <th className="border border-gray-300 px-4 py-2">Total Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {request.itemDetails
                                                    .filter(itemDetail => itemDetail.supplier.vendorId === supplierId)
                                                    .map(itemDetail => (
                                                        <tr key={itemDetail.id}>
                                                            <td className="border border-gray-300 px-4 py-2">{itemDetail.item.itemName}</td>
                                                            <td className="border border-gray-300 px-4 py-2">{itemDetail.item.quantity}</td>
                                                            <td className="border border-gray-300 px-4 py-2">{itemDetail.offerUnitPrice}</td>
                                                            <td className="border border-gray-300 px-4 py-2">{itemDetail.item.quantity * itemDetail.offerUnitPrice}</td>
                                                        </tr>
                                                    ))}
                                                <tr>
                                                    <td className="border border-gray-300 px-4 py-2 font-semibold">Subtotal</td>
                                                    <td className="border border-gray-300 px-4 py-2"></td>
                                                    <td className="border border-gray-300 px-4 py-2"></td>
                                                    <td className="border border-gray-300 px-4 py-2 font-semibold">{subtotals[supplierId]}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default TotalCostEvaluation