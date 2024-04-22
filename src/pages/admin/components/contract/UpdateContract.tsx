// import React from "react";
// import { ContractData, Item, Supplier } from "../../types";
// import { useParams } from "react-router-dom";
// import useApi from "@/hooks/useApi";

// const UpdateContract = () => {
//   const { axiosApi } = useApi()

//   const { id } = useParams();
//   const [contractData, setContractData] = React.useState<ContractData>({
//     contractTitle: "",
//     contractType: "",
//     contractStartDate: "",
//     contractEndDate: "",
//     termsAndConditions: "",
//     items: [],
//     vendorId: "",
//   });

//   const [items, setItems] = React.useState([]);
//   const [suppliers, setSuppliers] = React.useState([]);

//   React.useEffect(() => {
//     // Fetch items from the API
//     fetchItems()
//       .then((data) => setItems(data))
//       .catch((error) => console.error("Error fetching items:", error));

//     // Fetch suppliers from the API
//     fetchSuppliers()
//       .then((data) => setSuppliers(data))
//       .catch((error) => console.error("Error fetching suppliers:", error));
//     const fetchCategoryData = async () => {
//       try {
//         const response = await axiosApi.get(`/contract/${id}`);
//         const contract = response.data;
//         setContractData(contract);
//       } catch (error) {
//         console.error("Error fetching category data:", error);
//       }
//     };

//     fetchCategoryData();
//   }, [id]);

//   const fetchItems = async () => {
//     const response = await axiosApi.get("/items");
//     return response.data;
//   };

//   const fetchSuppliers = async () => {
//     const response = await axiosApi.get("/suppliers");
//     return response.data;
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     if (name === "items") {
//       const selectElement = e.target as HTMLSelectElement;
//       const selectedItems = Array.from(
//         selectElement.selectedOptions,
//         (option) => option.value
//       );
//       setContractData((prevData) => ({ ...prevData, items: selectedItems }));
//     } else {
//       setContractData((prevData) => ({ ...prevData, [name]: value }));
//     }
//   };

//   const UpdateContract = async () => {
//     console.log(contractData, "test co");

//     const itemsArray = contractData.items.map((itemId) => ({ itemId }));

//     const dataToSend = {
//       ...contractData,
//       items: itemsArray,
//     };

//     try {
//       const response = await axiosApi.put(`/contract/${id}`, dataToSend);

//       if (!response.data) {
//         throw new Error(`Failed to create contract: ${response.statusText}`);
//       }

//       console.log("Response from backend:", response.data);
//     } catch (error) {
//       console.error("Error creating contract:", error);
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto pt-16">
//       <label
//         htmlFor="contractTitle"
//         className="block text-sm font-medium text-gray-700 mb-2"
//       >
//         Contract Title:
//       </label>
//       <input
//         type="text"
//         id="contractTitle"
//         name="contractTitle"
//         value={contractData.contractTitle}
//         onChange={handleInputChange}
//         className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
//       />

//       <label
//         htmlFor="contractType"
//         className="block text-sm font-medium text-gray-700 mb-2"
//       >
//         Contract Type:
//       </label>
//       <input
//         type="text"
//         id="contractType"
//         name="contractType"
//         value={contractData.contractType}
//         onChange={handleInputChange}
//         className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
//       />

//       <div className="flex flex-col">
//         <label className="leading-loose">Start Date</label>
//         <div className="relative focus-within:text-gray-600 text-gray-400">
//           <input
//             type="date"
//             id="dueDate"
//             name="dueDate"
//             value={contractData.contractStartDate}
//             onChange={handleInputChange}
//             className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
//             placeholder="02/26/2020"
//           />
//           <div className="absolute left-3 top-2">
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//                 stroke-width="2"
//                 d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//               ></path>
//             </svg>
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-col">
//         <label className="leading-loose">Due Date</label>
//         <div className="relative focus-within:text-gray-600 text-gray-400">
//           <input
//             type="date"
//             id="dueDate"
//             name="dueDate"
//             value={contractData.contractEndDate}
//             onChange={handleInputChange}
//             className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
//             placeholder="02/26/2020"
//           />
//           <div className="absolute left-3 top-2">
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//                 stroke-width="2"
//                 d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//               ></path>
//             </svg>
//           </div>
//         </div>
//       </div>

//       <label
//         htmlFor="termsAndConditions"
//         className="block text-sm font-medium text-gray-700 mb-2"
//       >
//         Terms and Conditions:
//       </label>
//       <input
//         id="termsAndConditions"
//         name="termsAndConditions"
//         value={contractData.termsAndConditions}
//         onChange={handleInputChange}
//         className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
//       />

//       <label
//         htmlFor="items"
//         className="block text-sm font-medium text-gray-700 mb-2"
//       >
//         Select Items:
//       </label>
//       <select
//         id="items"
//         name="items"
//         onChange={handleInputChange}
//         value={contractData.items}
//         multiple
//         className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
//       >
//         {items.map((item: Item, i) => (
//           <option key={i} value={item.itemId}>
//             {item.itemName}
//           </option>
//         ))}
//       </select>

//       {/* Suppliers dropdown */}
//       <label
//         htmlFor="vendorId"
//         className="block text-sm font-medium text-gray-700 mb-2"
//       >
//         Select Supplier:
//       </label>
//       <select
//         className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
//         id="vendorId"
//         name="vendorId"
//         onChange={handleInputChange}
//         value={contractData.vendorId}
//       >
//         <option value="">Select a supplier</option>
//         {suppliers.map((supplier: Supplier) => (
//           <option key={supplier.vendorId} value={supplier.vendorId}>
//             {supplier.name}
//           </option>
//         ))}
//       </select>

//       <div className="pt-4 flex items-center space-x-4">
//         <button
//           onClick={UpdateContract}
//           className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
//         >
//           Edit Category
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UpdateContract;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { ContractData, Item, Supplier } from "../../types";
import { toast } from "react-toastify";
import useApi from "@/hooks/useApi";
import { useParams } from "react-router-dom";

const UpdateContract = () => {
  const { id } = useParams();
  const { axiosApi } = useApi();

  const [contractData, setContractData] = React.useState<ContractData>({
    contractTitle: "",
    contractType: "",
    contractStartDate: "",
    contractEndDate: "",
    termsAndConditions: "",
    items: [],
    vendorId: "",
  });

  const [items, setItems] = React.useState([]);
  const [suppliers, setSuppliers] = React.useState([]);
  const [startDateError, setStartDateError] = React.useState<string>("");
  const [dueDateError, setDueDateError] = React.useState<string>("");
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    // Fetch items from the API
    fetchItems()
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching items:", error));

    fetchSuppliers()
      .then((data) => setSuppliers(data))
      .catch((error) => console.error("Error fetching suppliers:", error));

    const fetchContractData = async () => {
      try {
        const response = await axiosApi.get(`/contract/${id}`);
        const contract = response.data;
        setContractData(contract);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchContractData();
  }, [id]);

  const fetchItems = async () => {
    const response = await axiosApi.get("/items");
    const items = response.data;
    return items;
  };

  const fetchSuppliers = async () => {
    const response = await axiosApi.get("/suppliers");
    const suppliers = response.data;
    return suppliers;
  };

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
      if (name === "contractStartDate" || name === "contractEndDate") {
        const startDate =
          name === "contractStartDate" ? value : contractData.contractStartDate;
        const dueDate =
          name === "contractEndDate" ? value : contractData.contractEndDate;

        const today = new Date();
        const startDateObj = new Date(startDate);
        const dueDateObj = new Date(dueDate);

        if (startDateObj > today && name === "contractStartDate") {
          setStartDateError("Start date should be in the past or present.");
        } else {
          setStartDateError("");
        }

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

  const UpdateContract = async () => {
    if (!validateForm()) {
      return;
    }

    const itemsArray = contractData.items.map((itemId) => ({ itemId }));

    const dataToSend = {
      ...contractData,
      items: itemsArray,
    };

    try {
      const response = await axiosApi.put(`/contract/${id}`, dataToSend);

      if (!response.data) {
        throw new Error(`Failed to create contract: ${response.statusText}`);
      }
      toast.success("Contract created successfully");
      setContractData({
        contractTitle: "",
        contractType: "",
        contractStartDate: "",
        contractEndDate: "",
        termsAndConditions: "",
        items: [],
        vendorId: "",
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

    if (!contractData.contractTitle) {
      newErrors.contractTitle = "Contract title is required";
      isValid = false;
    }
    if (!contractData.contractType) {
      newErrors.contractType = "Contract type is required";
      isValid = false;
    }
    if (!contractData.termsAndConditions) {
      newErrors.termsAndConditions = "Terms and conditions are required";
      isValid = false;
    }
    // if (contractData.items.length === 0) {
    //   newErrors.items = "At least one item must be selected";
    //   isValid = false;
    // }
    if (!contractData.vendorId) {
      newErrors.vendorId = "Supplier must be selected";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <div className="max-w-7xl mx-auto pt-16 py-16">
      <div className="flex items-center space-x-5">
        <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
          i
        </div>
        <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
          <h2 className="leading-relaxed uppercase">Edit Contract</h2>
        </div>
      </div>
      <div className=" max-w-7xl m-auto">
        <label
          htmlFor="contractTitle"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Contract Title:
        </label>
        <input
          type="text"
          id="contractTitle"
          name="contractTitle"
          value={contractData.contractTitle}
          onChange={handleInputChange}
          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
        />
        {errors.contractTitle && (
          <div className="text-red-600">{errors.contractTitle}</div>
        )}

        <label
          htmlFor="contractType"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Contract Type:
        </label>
        <input
          type="text"
          id="contractType"
          name="contractType"
          value={contractData.contractType}
          onChange={handleInputChange}
          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
        />
        {errors.contractType && (
          <div className="text-red-600">{errors.contractType}</div>
        )}

        <div className="flex flex-col">
          <label className="leading-loose">Start Date</label>
          <div className="relative focus-within:text-gray-600 text-gray-400">
            <input
              type="date"
              id="contractStartDate"
              name="contractStartDate"
              value={contractData.contractStartDate}
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
            {startDateError && <p className="text-red-500">{startDateError}</p>}
          </div>
        </div>

        <div className="flex flex-col">
          <label className="leading-loose">Due Date</label>
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
            {dueDateError && <p className="text-red-500">{dueDateError}</p>}
          </div>
        </div>

        <label
          htmlFor="termsAndConditions"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Terms and Conditions:
        </label>
        <input
          id="termsAndConditions"
          name="termsAndConditions"
          value={contractData.termsAndConditions}
          onChange={handleInputChange}
          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
        />
        {errors.termsAndConditions && (
          <div className="text-red-600">{errors.termsAndConditions}</div>
        )}

        <label
          htmlFor="items"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Select Items:
        </label>
        <select
          id="items"
          name="items"
          onChange={handleInputChange}
          value={contractData.items}
          multiple
          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
        >
          {items.map((item: Item, i) => (
            <option key={i} value={item.itemId}>
              {item.itemName}
            </option>
          ))}
        </select>
        {errors.items && <div className="text-red-600">{errors.items}</div>}

        {/* Suppliers dropdown */}
        <label
          htmlFor="vendorId"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Select Supplier:
        </label>
        <select
          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
          id="vendorId"
          name="vendorId"
          onChange={handleInputChange}
          value={contractData.vendorId}
        >
          <option value="">Select a supplier</option>
          {suppliers.map((supplier: Supplier) => (
            <option key={supplier.vendorId} value={supplier.vendorId}>
              {supplier.name}
            </option>
          ))}
        </select>
        {errors.vendorId && (
          <div className="text-red-600">{errors.vendorId}</div>
        )}
        <div className="pt-4 flex items-center space-x-4">
          <button
            onClick={UpdateContract}
            className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
          >
            Update Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateContract;
