/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { toast } from "react-toastify";
import { axiosApi } from "../../../../api";
import { useParams } from "react-router-dom";

function Approve() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [approvalAction, setApprovalAction] = React.useState<string>("");

  const approveContract = async () => {
    setIsLoading(true);

    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axiosApi.patch(
        `/contract/edit-contract/${id}`,
        null,
        {
          params: {
            contractStatus: `${approvalAction}`,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      const responseData = response.data;
      toast.success(responseData.message);
      console.log("Response from backend:", responseData);
    } catch (error) {
      toast.error("Error approving purchase order");
      console.error("Error approving purchase order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    approveContract();
  }, []);
  return (
    <div className="py-5">
      <div className="flex items-center">
        <button
          onClick={approveContract}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300 mr-2"
        >
          Approve{" "}
        </button>
      </div>
    </div>
  );
}

export default Approve;
