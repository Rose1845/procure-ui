import useApi from "@/hooks/useApi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function SendApprovalEmail() {
  const { id } = useParams();
  const { axiosApi } = useApi()

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
      <div className="pt-4 flex items-center space-x-4">
        <button
          onClick={sendToSupplier}
          className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
        >
          Send to Supplier
        </button>
      </div>
  );
}

export default SendApprovalEmail;
