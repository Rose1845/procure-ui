// Import necessary dependencies
import React, { useState, useEffect } from "react";
import axios from "axios";
import { PurchaseRequest } from "../../types";
import { useParams } from "react-router-dom";

// Define interface for OfferItem
interface OfferItemUpdate {
  offerUnitPrice: number;
}

// Define component
const OfferManagement: React.FC = () => {
    const { purchaseRequestId } = useParams()
  const [purchaseRequest, setPurchaseRequest] =
    useState<PurchaseRequest | null>(null);
  const [offerItemUpdates, setOfferItemUpdates] = useState<OfferItemUpdate[]>(
    []
  );

  // Fetch purchase request data on component mount
  useEffect(() => {
    const fetchPurchaseRequest = async () => {
      try {
        const response = await axios.get(
          `/purchase-request/${purchaseRequestId}`
        ); // Replace with your actual API endpoint
        setPurchaseRequest(response.data);
      } catch (error) {
        console.error("Error fetching purchase request:", error);
      }
    };

    fetchPurchaseRequest();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  // Handle offer item updates
  const handleOfferItemUpdate = (index: number, newOfferUnitPrice: number) => {
    setOfferItemUpdates((prevUpdates) => {
      const updatedOfferItemUpdates = [...prevUpdates];
      updatedOfferItemUpdates[index] = { offerUnitPrice: newOfferUnitPrice };
      return updatedOfferItemUpdates;
    });
  };

  // Submit offer item updates to backend
  const submitOfferItemUpdates = async () => {
    try {
      const response = await axios.patch(
        `/purchase-request/${purchaseRequestId}/suppliers/${supplierId}/offer-items`,
        offerItemUpdates
      );

      // Handle success, update UI, etc.
      console.log("Offer items updated successfully:", response.data);
    } catch (error) {
      // Handle error appropriately
      console.error("Error updating offer items:", error);
    }
  };

  // Render UI
  return (
    <div>
      <h1>Offer Management</h1>
      {purchaseRequest && (
        <>
          <h2>Purchase Request ID: {purchaseRequest.purchaseRequestId}</h2>
          <h3>Suppliers:</h3>
          <ul>
            {purchaseRequest.suppliers.map((supplier) => (
              <li key={supplier.vendorId}>{supplier.name}</li>
            ))}
          </ul>
          <h3>Items:</h3>
          <ul>
            {purchaseRequest.items.map((item, index) => (
              <li key={item.itemId}>
                {item.itemName}
                <span>
                  Offer Unit Price:{" "}
                  <input
                    type="number"
                    value={offerItemUpdates[index]?.offerUnitPrice || 0}
                    onChange={(e) =>
                      handleOfferItemUpdate(index, +e.target.value)
                    }
                  />
                </span>
              </li>
            ))}
          </ul>
          <button onClick={submitOfferItemUpdates}>
            Submit Offer Item Updates
          </button>
        </>
      )}
    </div>
  );
};

export default OfferManagement;
