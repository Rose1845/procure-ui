/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import { Contract } from "../../types";
import { toast } from "react-toastify";
import useApi from "@/hooks/useApi";

const CreateOrderFromContract = () => {
  const { axiosApi } = useApi()

  const [orderData, setOrderData] = React.useState({
    purchaseOrderTitle: "",
    deliveryDate: "",
    termsAndConditions: "",
    paymentType: "MPESA" || "PAYPAL",
    items: [],
    contractId: "",
    vendorId: "",
  });

  const [contracts, setContract] = React.useState<Contract[]>([]);

  React.useEffect(() => {
    const fetchContractData = async () => {
      try {
        const response = await axiosApi.get("/contract/status-open");
        const existingContract = response.data;
        console.log(existingContract, "contract");
        setContract(existingContract);
      } catch (error) {
        console.error(error);
      }
    };
    fetchContractData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({ ...prevData, [name]: value }));
  };

  const createOrder = async () => {
    const dataToSend = {
      ...orderData,
    };

    try {
      const response = await axiosApi.post(
        `/purchase-order/create-from-contract/${orderData.contractId}`,
        dataToSend
      );
      const responseData = response.data;
      toast.success("order created successfully");
      setOrderData({
        purchaseOrderTitle: "",
        deliveryDate: "",
        termsAndConditions: "",
        paymentType: "MPESA" || "PAYPAL",
        items: [],
        contractId: "",
        vendorId: "",
      });
      console.log("Response from backend:", responseData);
    } catch (error) {
      toast.error("An error occured!");
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pt-16 py-16">
      <div className="flex items-center space-x-5">
        <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
          i
        </div>
        <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
          <h2 className="leading-relaxed uppercase">Create Purchase Order From Contract </h2>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-16">
        <label className="block mb-2" htmlFor="purchaseOrderTitle">
          Purchase Order Title:
        </label>
        <input
          className="w-full border p-2 mb-4"
          type="text"
          id="purchaseOrderTitle"
          name="purchaseOrderTitle"
          value={orderData.purchaseOrderTitle}
          onChange={handleInputChange}
        />

        <label className="block mb-2" htmlFor="deliveryDate">
          Delivery Date:
        </label>
        <input
          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
          type="date"
          id="deliveryDate"
          name="deliveryDate"
          value={orderData.deliveryDate}
          onChange={handleInputChange}
        />

        <label className="block mb-2" htmlFor="termsAndConditions">
          Terms and Conditions:
        </label>
        <textarea
          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
          id="termsAndConditions"
          name="termsAndConditions"
          value={orderData.termsAndConditions}
          onChange={handleInputChange}
        />

        <label className="block mb-2" htmlFor="paymentType">
          Payment Type:
        </label>
        <select
          className="w-full border p-2 mb-4"
          id="paymentType"
          name="paymentType"
          value={orderData.paymentType}
          onChange={handleInputChange}
        >
          <option value="">Select Payment Type</option>
          <option value="MPESA">MPESA</option>
          <option value="PAYPAL">PAYPAL</option>
        </select>

        <label className="block mb-2" htmlFor="vendorId">
          Choose a contract
        </label>
        <select
          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
          id="contractId"
          name="contractId"
          value={orderData.contractId}
          onChange={handleInputChange}
        >
          <option value="contractId">Choose a contract</option>
          {contracts.map((contract: any, i) => (
            <option key={i} value={contract.contractId}>
              {contract.contractTitle}
            </option>
          ))}
        </select>

        <div className="pt-4 flex items-center space-x-4">
          <button
            onClick={createOrder}
            className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
          >
            Create Order From Contract
          </button>
        </div>
      </div>

    </div>
  );
};

export default CreateOrderFromContract;
