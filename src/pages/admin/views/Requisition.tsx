import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { PurchaseRequisition } from "../types";
import useApi from "@/hooks/useApi";

function Requisition() {
  const { axiosApi } = useApi();
  const { id } = useParams();
  const [requisition, setRequisition] = useState<
    PurchaseRequisition | undefined
  >(undefined);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleApproveReject = async () => {
    setIsLoading(true);

    try {
      const response = await axiosApi.patch(
        `/purchase-requisition/approve/${id}`,
        null,
        {
          params: {
            contractStatus: selectedStatus.toUpperCase(), // Send selected status to backend
          },
        }
      );
      const responseData = response.data;
      console.log("Response from backend:", responseData);
      // Update the requisition data if needed
      if (requisition) {
        setRequisition({
          ...requisition,
          approvalStatus: selectedStatus.toUpperCase(),
        });
      }
    } catch (error) {
      console.error("Error updating requisition status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    const fetchRequisition = async () => {
      try {
        const response = await axiosApi.get(`/purchase-requisition/${id}`);
        const requisitionData = response.data;
        setRequisition(requisitionData);
      } catch (error) {
        console.error("Error fetching requisition:", error);
      }
    };
    fetchRequisition();
  }, [axiosApi, id]);

  return (
    <div>
      {requisition && (
        <div>
          <h2>{requisition.requisitionTitle}</h2>
          <p>Status: {requisition.approvalStatus}</p>

          {/* Dropdown and Button for approval */}
          <div>
            <label>Select Status:</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">Select</option>
              <option value="approve">Approve</option>
              <option value="reject">Reject</option>
            </select>
            <button
              onClick={handleApproveReject}
              disabled={!selectedStatus || isLoading}
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Requisition;
