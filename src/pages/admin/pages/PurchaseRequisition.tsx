import React from "react";
import CreateRequisition from "../components/requisition/CreateRequisition";
import { Link } from "react-router-dom";

function PurchaseRequisition() {
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
    </div>
  );
}

export default PurchaseRequisition;
