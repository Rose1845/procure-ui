/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Contract, Supplier } from "../../types";
import useApi from "@/hooks/useApi";

const ApproveContract = () => {
  const { axiosApi } = useApi()

  const { id } = useParams();
  const [contract, setContract] = React.useState<Contract>();
  const [supplierDetails,setSupplierDetails] = React.useState<Supplier>();
  const [approvalAction, setApprovalAction] = React.useState<string>("");
  const [, setIsLoading] = React.useState(false);

  useEffect(() => {
    const fetchContract = async () => {
      try {
        const response = await axiosApi.get(`/contract/contract-items/${id}`);
        setContract(response.data);
        console.log("Contract retrived successfully",response.data.contractStatus);
      } catch (error) {
        console.error("Error updating Contract:", error);
      }
    };
    const fetchSupplierDetails = async () => {
      try {
        const response = await axiosApi.get(`/suppliers/supplier/${contract?.vendorId}`);
        setSupplierDetails(response.data);
      } catch (error) {
        console.error("Error fetching Supplier details:", error);
      }
    };
    fetchSupplierDetails()
    fetchContract();
  }, [contract?.vendorId, id]);
  const handleApprovalAction = (action: string) => {
    setApprovalAction(action);
    ApproveContract();
  };

  const ApproveContract = async () => {
    try {
      const response = await axiosApi.patch(
        `/contract/edit-contract/${id}`,
        null,
        {
          params: {
            contractStatus: `${approvalAction}`,
          }
        }
      );
      const responseData = response.data;
      toast.success(responseData.message);
      console.log("Response from backend:", responseData);
    } catch (error) {
      toast.error("Error approving contract");
      console.error("Error approving contract:", error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log("Contract Status:", contract?.contractStatus); // Check contract status here

  return (
    <div className="max-w-7xl mx-auto mt-8 py-16">
      <div className="flex items-center">
        {(contract?.contractStatus !== "ACCEPTED" &&
          contract?.contractStatus !== "DECLINE" &&
          contract?.contractStatus !== "TERMINATE") && (
            <>
              <button
                onClick={() => handleApprovalAction("ACCEPTED")}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300 mr-2"
              >
                ACCEPTED
              </button>
              <button
                onClick={() => handleApprovalAction("DECLINE")}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring focus:border-red-300 mr-2"
              >
                DECLINE
              </button>
              <button
                onClick={() => handleApprovalAction("TERMINATE")}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring focus:border-red-300 mr-2"
              >
                TERMINATE
              </button>
            </>
          )}
      </div>

      <div>
        <div>
          <td className="px-4 py-3 text-xs">
            <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">
              {contract?.contractStatus}
            </span>
          </td>
          <h2>Contract Name: {contract?.contractTitle}</h2>
          <h2>Contract Type: {contract?.contractType}</h2>
          <h2>Expires On: {contract?.contractEndDate}</h2>
          <h2>Status: {contract?.contractStatus}</h2>
        </div>
        <div>
          Contract Terms and Condition:
          {contract?.termsAndConditions}
        </div>
        <div className="pt-3">
          <h1>Supplier Details</h1>
          {supplierDetails && (
            <div>
              <h2>Supplier Name: {supplierDetails.name}</h2>
              <h2>Supplier Email: {supplierDetails.email}</h2>
              <h2>Address:{supplierDetails.address.box}{supplierDetails.address.city},{supplierDetails.address.country}</h2>
              <h2>Location:{supplierDetails.address.location}</h2>
            </div>
          )}
        </div>
        <div className="max-w-7xl mx-auto pt-16 ">
          <div className="w-full overflow-hidden rounded-lg shadow-xs">
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400">
                    <th className="px-4 py-3">ItemName</th>
                    <th className="px-4 py-3">Quantity</th>
                    <th className="px-4 py-3">Unit Price</th>
                    <th className="px-4 py-3">Total Price</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y dark:divide-gray-500">
                  {contract?.items.map((order, i) => (
                    <tr
                      key={i}
                      className="bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center text-sm">
                          <div>
                            <p className="font-semibold">{order.itemName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{order.quantity}</td>
                      <td className="px-4 py-3 text-xs">
                        <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                          {order.unitPrice}{" "}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">{order.totalPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApproveContract;
