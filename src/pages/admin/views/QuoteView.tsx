import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosApi } from '@/api';
import { PurchaseRequest } from '../types';

interface OfferItem {
    id: number;
    item: {
        itemId: string;
        itemName: string;
        itemDescription: string;
    };
    supplier: {
        vendorId: string;
        name: string;
    };
    offerUnitPrice: number;
    quoteStatus: string;
}

const QuoteView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [offers, setOffers] = useState<OfferItem[]>([]);
    const [request, setRequest] = React.useState<PurchaseRequest>();

    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const response = await axiosApi.get(`/purchase-request/${id}`);
                setRequest(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchRequest();
    }, [id]);

    const getOffers = async (supplierId: string) => {
        try {
            const url = `/purchase-request/${id}/getOffers?supplierId=${supplierId}`;
            const response = await axiosApi.get(url);
            const offersData = response.data;
            setOffers(offersData);
        } catch (error) {
            console.error('Error fetching offers:', error);
        }
    };

    useEffect(() => {
        if (request && request.itemDetails) {
            const supplierId = request.itemDetails[0].supplier.vendorId; // Assuming the first item detail contains the supplier ID
            getOffers(supplierId);
        }
    }, [request]);

    return (
        <div>
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
            <h1>Accepted Offers</h1>
            <div>
                {offers.map((offer) => (
                    <div key={offer.id} className="offerItem">
                        <p>Item ID: {offer.item.itemId}</p>
                        <p>Item Name: {offer.item.itemName}</p>
                        <p>Item Description: {offer.item.itemDescription}</p>
                        <p>Unit Price: {offer.offerUnitPrice}</p>
                        <p>Quote Status: {offer.quoteStatus}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuoteView;
