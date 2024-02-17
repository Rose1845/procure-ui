import React from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosApi } from "../../../../api";

function SendApprovalEmail() {
  const { id } = useParams();

  const sendToSupplier = async () => {
    try {
      const response = await axiosApi.get(`/contract/send-to-supplier/${id}}`);
      console.log(response.request);

      if (!response.data) {
        throw new Error(
          `Failed to send contract to supplier: ${response.statusText}`
        );
      }
      toast.success("Contract sent to supplier successfully");
      console.log("Response from backend:", response.data);
    } catch (error) {
      toast.error("An error occurred while sending contract to supplier");
      console.error("Error sending contract to supplier:", error);
    }
  };
  return (
    <div>
      <button onClick={sendToSupplier}>send to supplier</button>
    </div>
  );
}

export default SendApprovalEmail;
