/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { toast } from "react-toastify";
import useApi from "@/hooks/useApi";
import { useParams } from "react-router-dom";

const RenewContract = () => {
  const { id } = useParams();
  const { axiosApi } = useApi();

  const [contractData, setContractData] = React.useState({
    contractEndDate: "",
  });
  const [dueDateError, setDueDateError] = React.useState<string>("");
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "items") {
      const selectElement = e.target as HTMLSelectElement;
      const selectedItems = Array.from(
        selectElement.selectedOptions,
        (option) => option.value
      );

      setContractData((prevData) => ({ ...prevData, items: selectedItems }));
    } else {
      setContractData((prevData) => ({ ...prevData, [name]: value }));
      if (name === "contractEndDate") {
        const dueDate =
          name === "contractEndDate" ? value : contractData.contractEndDate;
        const today = new Date();
        const dueDateObj = new Date(dueDate);
        if (dueDateObj < today && name === "contractEndDate") {
          setDueDateError("Due date should be in the present or future.");
        } else {
          setDueDateError("");
        }
      }

      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const RenewContract = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axiosApi.patch(
        `/contract/renew/${id}`,
        contractData
      );
      if (!response.data) {
        throw new Error(`Failed to create contract: ${response.statusText}`);
      }
      toast.success("Contract renewed successfully");
      setContractData({
        contractEndDate: "",
      });
      console.log("Response from backend:", response.data);
    } catch (error: any) {
      if (error.response && error.response.data) {
        const { errorMessage, errors } = error.response.data;
        if (errors) {
          setErrors(errors);
        } else {
          toast.error(errorMessage);
        }
      } else {
        toast.error("Error occurred!");
      }
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors: Record<string, string> = {};

    if (contractData.contractEndDate === "") {
      newErrors.contractEndDate = "Contract title is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <div className="max-w-7xl mx-auto pt-16 py-16">
     

      <div className="flex flex-col">
        <label className="leading-loose">New Expiry Date</label>
        <div className="relative focus-within:text-gray-600 text-gray-400">
          <input
            type="date"
            id="contractEndDate"
            name="contractEndDate"
            value={contractData.contractEndDate}
            onChange={handleInputChange}
            className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
            placeholder="02/26/2020"
          />
          <div className="absolute left-3 top-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
          {errors.contractEndDate && <p>{errors.contractEndDate}</p>}
          {dueDateError && <p className="text-red-500">{dueDateError}</p>}
        </div>
      </div>

      <div className="pt-4 flex items-center space-x-4">
        <button
          onClick={RenewContract}
          className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
        >
          Renew Contract
        </button>
      </div>
    </div>
  );
};

export default RenewContract;
