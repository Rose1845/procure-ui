import React from "react";
import { useParams } from "react-router-dom";
import { Contract, Supplier } from "../types";
import { toast } from "react-toastify";
import useApi from "@/hooks/useApi";

const ContractView = () => {
  const { axiosApi } = useApi()

  const { id } = useParams();
  const [contract, setContract] = React.useState<Contract>();
  const [supplierDetails, setSupplierDetails] = React.useState<Supplier>();
  const [totalAmount, setTotalAmount] = React.useState<number>(0);
  const [isLoading, setIsloading] = React.useState(false);

  React.useEffect(() => {
    const fetchContract = async () => {
      try {
        const response = await axiosApi.get(`/contract/contract-items/${id}`);
        setContract(response.data);
        console.log("Contract retrieved successfully");
      } catch (error) {
        console.error("Error fetching Contract:", error);
      }
    };

    const fetchSupplierDetails = async () => {
      try {
        const response = await axiosApi.get(`/suppliers/supplier/${contract?.vendorId}`);
        console.log(response.data, "supplier de");

        setSupplierDetails(response.data);
        console.log("Supplier details retrieved successfully");
      } catch (error) {
        console.error("Error fetching Supplier details:", error);
      }
    };

    fetchContract();
    fetchSupplierDetails();
  }, [contract?.vendorId, id]);

  const sendToSupplier = async () => {
    try {
      const response = await axiosApi.post(
        `/contract/send-to-supplier/${id}`
      );
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
    } finally {
      setIsloading(false)
    }
  };
  const cloneContract = async () => {
    setIsloading(true)

    try {
      const response = await axiosApi.post(
        `/contract/clone-contract/${id}`
      );
      if (!response.data) {
        throw new Error(
          `Failed to cloned: ${response.statusText}`
        );
      }
      toast.success("Contract cloned successfully");
      console.log("Response from backend:", response.data);
    } catch (error) {
      toast.error("An error occurred while sending contract to supplier");
      console.error("Error sending contract to supplier:", error);
    } finally {
      setIsloading(false)
    }
  };
  const renewContract = async () => {
    setIsloading(true)

    try {
      const response = await axiosApi.patch(
        `/contract/edit-contract/${id}`,
        null,
        {
          params: {
            contractStatus: "RENEW",
          }
        }
      );
      const responseData = response.data;
      toast.success("COntract Renewed successfully");
      console.log("Response from backend:", responseData);
    } catch (error) {
      toast.error("Error approving contract");
      console.error("Error approving contract:", error);
    } finally {
      setIsloading(false)
    }
  };
  const terminateContract = async () => {
    setIsloading(true)

    try {
      const response = await axiosApi.patch(
        `/contract/edit-contract/${id}`,
        null,
        {
          params: {
            contractStatus: "TERMINATE",
          }
        }
      );
      const responseData = response.data;
      toast.success("COntract Renewed successfully");
      console.log("Response from backend:", responseData);
    } catch (error) {
      toast.error("Error approving contract");
      console.error("Error approving contract:", error);
    } finally {
      setIsloading(false)
    }
  };
  React.useEffect(() => {
    if (contract) {
      calculateTotalAmount(contract);
    }
  }, [contract]);
  const calculateTotalAmount = (contractData: Contract) => {
    let total = 0;
    if (contractData && contractData.items) {
      contractData.items.forEach((item) => {
        total += item.totalPrice;
      });
    }
    setTotalAmount(total);
  };
  return (
    <div className="max-w-7xl mx-auto mt-8 py-16">
      <div className="flex flex-row space-x-3">
        <div >
          {(contract?.contractStatus !== "DECLINE" &&
            contract?.contractStatus !== "EXPIRED" &&
            contract?.contractStatus !== "TERMINATED") && (
              <div className="flex flex-row space-x-3">
                <button
                  type="submit"
                  disabled={isLoading}

                  onClick={() => sendToSupplier()} // Pass the 'id' to the function
                  className="bg-green-500 uppercase mt-5 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300"
                >
                  Send Contract to Supplier
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  onClick={() => terminateContract()} // Pass the 'id' to the function
                className={`bg-red-500 uppercase mt-5 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300 ${isLoading ? "animate-spin bg-red-500 opacity-10 cursor-not-allowed" : ""}`}
                >
                  {isLoading ? "loading" : "Terminate contract"}
                </button>
              </div>

            )}
        </div>

        <div>
          {(contract?.contractStatus == "DECLINE" ||
            contract?.contractStatus == "EXPIRED" ||
            contract?.contractStatus == "TERMINATED") && (
              <button
                type="submit"
                disabled={isLoading}

                onClick={() => renewContract()} // Pass the 'id' to the function
                className="bg-green-500 uppercase mt-5 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300"
              >
                Renew Contract</button>
            )}
        </div>
        <div>
          <button
            type="submit"
            disabled={isLoading}

            onClick={() => cloneContract()} // Pass the 'id' to the function
            className="bg-green-500 uppercase mt-5 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300"
          >
            Cloned Contract </button>
        </div>
      </div>
      <div>

        <div>
          <td className="px-4 py-3 text-xs">
            <span className={`px-2 py-1 font-semibold leading-tight rounded-full ${contract && (
              contract.contractStatus === "DECLINE" ||
              contract.contractStatus === "EXPIRED" ||
              contract.contractStatus === "TERMINATED"
            )
              ? "text-red-700 bg-red-100"
              : "text-green-700 bg-green-100"
              }`}>
              {contract?.contractStatus}
            </span>
          </td>

          <h2>Contract Name: {contract?.contractTitle}</h2>

          <h2>Contract Type: {contract?.contractType}</h2>
          <h2>Expires On: {contract?.contractEndDate}</h2>
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
                <div className="flex flex-row space-x-2 pt-3">
                  <h1>Total Amount:</h1>
                  <div className="font-bold">{totalAmount}</div>
                </div>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractView;
