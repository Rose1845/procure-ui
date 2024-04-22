import React from "react";
import { useParams } from "react-router-dom";
import useApi from "@/hooks/useApi";
import { PurchaseRequisition } from "../types";
import { toast } from "react-toastify";

function Approvals() {
  const {id} = useParams()
  const { axiosApi } = useApi();

  const [requisitions, setRequisitions] = React.useState<PurchaseRequisition[]>(
    []
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState("");

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
      toast.success("Done successfully!!");
      console.log("Response from backend:", responseData);
    } catch (error) {
      toast.error("Error updating contract status");
      console.error("Error updating contract status:", error);
    } finally {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    fetchRequisitions()
      .then((data) => setRequisitions(data))
      .catch((error) => console.error("Error fetching requisition:", error));
  }, []);
  const fetchRequisitions = async () => {
    const response = await axiosApi.get("/purchase-requisition");
    const requisition = response.data;
    console.log(requisition, "requisitions");
    console.log(requisitions, "reqesss");
    return requisition;
  };
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto pt-16 ">
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Number</th>
                  <th className="px-4 py-3">Date Created</th>
                  <th className="px-4 py-3">Due Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-500">
                {requisitions.map((requi, i) => (
                  <tr
                    key={i}
                    className="bg-gray-50 hover:bg-gray-100  text-gray-700 dark:text-gray-400"
                  >
                    <td className="px-4 flex flex-col-reverse py-3 text-sm">
                      <span> {requi.requisitionTitle}</span>
                      <div>
                        <span
                          className={` px-4 py-2 leading-tight text-neutral-950 rounded-full  ${
                            requi.approvalStatus === "COMPLETED"
                              ? "bg-green-500 text-white"
                              : requi.approvalStatus === "FULLY_RECEIVED"
                              ? "bg-purple-500 text-white"
                              : requi.approvalStatus === "ISSUED"
                              ? "bg-gray-500 text-white"
                              : requi.approvalStatus === "REJECT"
                              ? "bg-red-500 text-white"
                              : requi.approvalStatus === "PENDING"
                              ? "bg-green-500 text-white"
                              : requi.approvalStatus === "IN_DELIVERY"
                              ? "bg-blue-500 text-white"
                              : "bg-blue-600 text-white" // Default color for other statuses
                          }`}
                        >
                          {requi.approvalStatus}{" "}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{requi.requisitionId}</td>
                    <td className="px-4 py-3 text-sm">
                      {" "}
                      {new Date(requi.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {new Date(requi.dateNeeded).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-16 ">
        <label className="mr-2">Select Status:</label>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded"
        >
          <option value="">Select</option>
          <option value="approve">Approve</option>
          <option value="reject">Reject</option>
        </select>
        <button
          onClick={handleApproveReject}
          disabled={!selectedStatus || isLoading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </div>
    </div>
  );
}

export default Approvals;
