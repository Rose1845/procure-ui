import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosApi } from "../../../api";
import { PurchaseRequisition } from "../types";

function PurchaseRequisition() {
  const navigate = useNavigate();
  const [requisitions, setRequisitions] = React.useState<PurchaseRequisition[]>([]);
  React.useEffect(() => {
    fetchRequisitions()
      .then((data) => setRequisitions(data))
      .catch((error) => console.error("Error fetching requisition:", error));
  }, []);
  const fetchRequisitions = async () => {
    const response = await axiosApi.get("/purchase-requisition");
    const requisition = response.data;
    console.log(requisition, "requisitions");
    console.log(requisitions,"reqesss")
    return requisition;
  };
  return (
    <div className="py-16">
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-blue-600 text-white">
          <Link to={"/dashboard/purchase-requisition/add_requisition"}>
            {" "}
            Add Purchase Requisition
          </Link>
        </button>
      </div>
      <div className="flex justify-center items-center">
        {requisitions.map((req, i) => (
          <div key={i}>
            <div>
              <p>{req.approvalStatus}</p>
              <h4>{req.requisitionTitle}</h4>
              <h6>Due Date:{new Date(req.dateNeeded).toDateString()}</h6>
              <h6> Date:{new Date(req.createdAt).toDateString()}</h6>
              <p>{req.createdBy.toString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PurchaseRequisition;
