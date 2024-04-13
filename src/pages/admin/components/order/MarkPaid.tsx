import React from "react";
import { toast } from "react-toastify";
import { axiosApi } from "../../../../api";
import { useParams } from "react-router-dom";

function MarkPaid() {
  const { id } = useParams();
  const [, setIsLoading] = React.useState(false);

  const approvePurchaseOrder = async () => {
    setIsLoading(true);

    try {
      const response = await axiosApi.patch(
        `/purchase-order/approve/${id}`,
        null,
        {
          params: {
            approvalStatus: "FULLY_RECEIVED",
          },
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
    approvePurchaseOrder();
  }, []);
  return (
    <div className="py-5">
      <div className="flex items-center">
        <button
          onClick={approvePurchaseOrder}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300 mr-2"
        >
          MARK AS FULLY RECEIVED{" "}
        </button>
      </div>
    </div>
  );
}

export default MarkPaid;
