/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { axiosApi } from "../../../api";
import { Contract } from "../types";
import { toast } from "react-toastify";

function Contract() {
  const [contracts, setContracts] = React.useState<Contract[]>([]);
  React.useEffect(() => {
    fetchcontuisitions()
      .then((data) => setContracts(data))
      .catch((error) => console.error("Error fetching contuisition:", error));
  }, []);

  const fetchcontuisitions = async () => {
    const response = await axiosApi.get("/contract");
    const contract = response.data;
    console.log(contract, "contuisitions");
    console.log(contracts, "contesss");
    return contract;
  };

  // const handleEdit = (id: number) => {
  //   // Redirect or open a modal for editing based on the id
  //   navigate(`/dashboard/contract/edit/${id}`);
  //   console.log(`Editing contract with ID: ${id}`);
  // };
  // const handleDelete = async (id: number) => {
  //   try {
  //     // Send a DELETE contuest to delete the supplier with the given ID
  //     await axiosApi.delete(`/suppliers/${id}`);
  //     console.log(`contract with ID ${id} deleted successfully`);

  //     // Refresh the list of contract after deletion
  //     // fetchsuppliers();
  //   } catch (error) {
  //     console.error(`Error deleting contract with ID ${id}:`, error);
  //   }
  // };

  // const sendToSupplier = async (id: string) => {
  //   try {
  //     const response = await axiosApi.post(`/contract/send-to-supplier/${id}`);
  //     console.log(response.request);

  //     if (!response.data) {
  //       throw new Error(
  //         `Failed to send contract to supplier: ${response.statusText}`
  //       );
  //     }
  //     toast.success("Contract sent to supplier successfully");
  //     console.log("Response from backend:", response.data);
  //   } catch (error) {
  //     toast.error("An error occurred while sending contract to supplier");
  //     console.error("Error sending contract to supplier:", error);
  //   }
  // };

  return (
    <div className="max-w-7xl pt-16 mx-auto">
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-blue-600 text-white">
          <Link to={"/dashboard/contract/add_contract"}> Add Contract</Link>
        </button>
      </div>
      <div className="max-w-7xl mx-auto pt-16 ">
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Created At</th>
                  <th className="px-4 py-3">Due Date</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-500">
                {contracts.map((cont, i) => (
                  <tr
                    key={i}
                    className="bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400"
                  >
                    <td className="px-4 flex flex-col-reverse py-3 text-sm">
                      <span> {cont.contractTitle}</span>

                      <div>
                        <span className={`px-2 py-1 font-semibold leading-tight rounded-full ${cont.contractStatus === "Declined" ||
                          cont.contractStatus === "EXPIRED" ||
                          cont.contractStatus === "TERMINATED" ||
                          cont.contractStatus === "DECLINE"

                          ? "text-red-700 bg-red-100 dark:bg-red-700 dark:text-red-100"
                          : "text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100"
                          }`}
                        >
                          {cont.contractStatus}
                        </span>{" "}
                      </div>

                    </td>
                    <td className="px-4 py-3 text-sm">
                      {" "}
                      {new Date(cont.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {new Date(cont.contractEndDate).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <Link to={`/dashboard/contract/view/${cont.contractId}`}>
                        View
                      </Link>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 ">
            <span className="flex items-center col-span-3">
              {" "}
              Showing 21-30 of 100{" "}
            </span>
            <span className="col-span-2"></span>
            <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
              <nav aria-label="Table navigation">
                <ul className="inline-flex items-center">
                  <li>
                    <button
                      className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                      aria-label="Previous"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </li>
                  <li>
                    <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                      1
                    </button>
                  </li>
                  <li>
                    <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                      2
                    </button>
                  </li>
                  Order
                  <li>
                    <button className="px-3 py-1 text-white dark:text-gray-800 transition-colors duration-150 bg-blue-600 dark:bg-gray-100 border border-r-0 border-blue-600 dark:border-gray-100 rounded-md focus:outline-none focus:shadow-outline-purple">
                      3
                    </button>
                  </li>
                  <li>
                    <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                      4
                    </button>
                  </li>
                  <li>
                    <span className="px-3 py-1">...</span>
                  </li>
                  <li>
                    <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                      8
                    </button>
                  </li>
                  <li>
                    <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                      9
                    </button>
                  </li>
                  <li>
                    <button
                      className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                      aria-label="Next"
                    >
                      <svg
                        className="w-4 h-4 fill-current"
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </li>
                </ul>
              </nav>
            </span>
          </div>  */}
        </div>
      </div>
    </div>
  );
}

export default Contract;
