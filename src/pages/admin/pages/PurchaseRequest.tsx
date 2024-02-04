import React from "react";
import CreateRequest from "../components/request/CreateRequest";
import { Link } from "react-router-dom";

function PurchaseRequest() {
  return (
    <div className="py-16">
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-blue-600 text-white">
          <Link to={"/dashboard/purchase-request/add-request"}>
            {" "}
            Add Purchase Request
          </Link>
        </button>
      </div>
    </div>
  );
}

export default PurchaseRequest;
