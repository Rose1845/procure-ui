/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Contract, Supplier } from "../types";
import useApi from "@/hooks/useApi";
import { FaEdit } from "react-icons/fa";

function Contract() {
  const { axiosApi } = useApi();

  const [contracts, setContracts] = React.useState<Contract[]>([]);

  const [page, setPage] = React.useState<number>(0);
  const [totalPages, setTotalPages] = React.useState<number>(0);
  const [totalItems, setTotalItems] = React.useState<number>(0);
  const [suppliers, setSuppliers] = React.useState<Supplier[]>([]);
  const [selectedApprovalStatus, setSelectedApprovalStatus] = React.useState<
    string | null
  >(null);
  const [selectedSupplier, setSelectedSupplier] = React.useState<string | null>(
    null
  ); // Added state for selected supplier
  const pageSize = 5;
  const [sortBy, setSortBy] = React.useState<string>("createdAt"); // Default sort by createdAt
  const [sortDirection, setSortDirection] = React.useState<string>("desc"); // Default sort direction
  const [searchParams, setSearchParams] = React.useState<{
    contractTitle?: string;
    startDate?: string;
    endDate?: string;
  }>({});

  React.useEffect(() => {
    fetchContracts();
    fetchSuppliers();
  }, [
    page,
    pageSize,
    selectedSupplier,
    selectedApprovalStatus,
    sortBy,
    sortDirection,
  ]); // Added selectedSupplier to useEffect dependencies
  const fetchSuppliers = async () => {
    try {
      const response = await axiosApi.get("/suppliers");
      const suppliersData = response.data;
      setSuppliers(suppliersData);
      console.log("Suppliers retrieved successfully");
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };
  const navigate = useNavigate();
  const fetchContracts = async () => {
    try {
      let url = `/contract/paginations?page=${page}&size=${pageSize}`;
      if (selectedSupplier) {
        url += `&supplierId=${selectedSupplier}`;
      }
      if (selectedApprovalStatus) {
        url += `&contractStatus=${selectedApprovalStatus}`;
      }
      url += `&sortField=${sortBy}&sortDirection=s${sortDirection}`;
      if (searchParams.startDate) {
        url += `&startDate=${searchParams.startDate}`;
      }
      if (searchParams.contractTitle) {
        url += `&contractTitle=${searchParams.contractTitle}`;
      }
      if (searchParams.endDate) {
        url += `&endDate=${searchParams.endDate}`;
      }
      const response = await axiosApi.get(url);
      const {
        content,
        totalPages: total,
        totalElements: totalItems,
      } = response.data;
      setContracts(content);
      setTotalPages(total);
      setTotalItems(totalItems);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const handleSupplierChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedSupplier(event.target.value);
  };
  const handleApprovalStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedApprovalStatus(event.target.value);
  };

  const handleSortChange = (column: string) => {
    if (column === sortBy) {
      // Toggle sort direction if the same column is clicked again
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set new sort column and default direction to ascending
      setSortBy(column);
      setSortDirection("desc");
    }
  };
  const handleSearchParamsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchParams({
      ...searchParams,
      [event.target.name]: event.target.value,
    });
  };

  const handleSearch = () => {
    fetchContracts();
  };
  const clearSearchParams = () => {
    setSearchParams({
      contractTitle: "",
      startDate: "",
      endDate: "",
    });
    fetchContracts();
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const startIndex = page * pageSize + 1;
  const endIndex = Math.min((page + 1) * pageSize, totalItems);

  const handleEdit = (id: string) => {
    // Redirect or open a modal for editing based on the id
    navigate(`/dashboard/contract/edit/${id}`);
    console.log(`Editing contract with ID: ${id}`);
  };
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
      <div className="max-w-7xl  pt-16 flex flex-row space-x-4">
        <div>
          <div className="flex flex-col justify-start">
            <div>
              <h3>Search...</h3>
              <input
                type="text"
                name="contractTitle"
                value={searchParams.contractTitle || ""}
                onChange={handleSearchParamsChange}
                placeholder="Search by contract title..."
                className="bg-white bcontract bcontract-gray-300 rounded px-3 py-1"
              />
            </div>
            {/* Date range filters */}
            <div className="flex flex-col space-y-3 mt-3">
              <h3>Search by Date Range</h3>
              <div className="flex  space-x-3 mt-3">
                <div>
                  <label htmlFor="from">From:</label>

                  <input
                    type="date"
                    name="startDate"
                    value={searchParams.startDate || ""}
                    onChange={handleSearchParamsChange}
                    className="bg-white bcontract bcontract-gray-300 rounded px-3 py-1"
                  />
                </div>
                <div>
                  <label htmlFor="To">To:</label>
                  <input
                    type="date"
                    name="endDate"
                    value={searchParams.endDate || ""}
                    onChange={handleSearchParamsChange}
                    className="bg-white bcontract bcontract-gray-300 rounded px-3 py-1"
                  />
                </div>
              </div>
            </div>
            <div className=" flex flex-row space-x-3 mt-3">
              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-4 py-2"
              >
                Search
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white"
                onClick={clearSearchParams}
              >
                Clear Search
              </button>
            </div>
          </div>
          <div className="flex mt-3 flex-col justify-start">
            <div className="font-bold">Filter By:</div>
            <div className="flex flex-col space-y-3">
              <select
                id="supplier"
                value={selectedSupplier || ""}
                onChange={handleSupplierChange}
                className="bg-white bcontract bcontract-gray-300 rounded px-3 py-1"
              >
                <option selected className="uppercase" value="">
                  ALL SUPPLIERS
                </option>
                {suppliers.map((supplier) => (
                  <option key={supplier.vendorId} value={supplier.vendorId}>
                    {supplier.name}
                  </option>
                ))}
              </select>
              <select
                id="contractStatus"
                value={selectedApprovalStatus || ""}
                onChange={handleApprovalStatusChange}
                className="bg-white bcontract bcontract-gray-300 rounded px-3 py-1"
              >
                <option selected value="">
                  ALL CONTRACT STATUS
                </option>
                <option value="ACCEPTED">ACCEPTED</option>
                <option value="EXPIRED">EXPIRED</option>
                <option value="PENDING_SUPPLIER_ACCEPTANCE">
                  PENDING_SUPPLIER_ACCEPTANCE
                </option>
                <option value="BUYER_ACCEPTANCE">BUYER_ACCEPTANCE</option>
                <option value="TERMINATE">TERMINATE</option>
                <option value="RENEW">RENEWED</option>
                <option value="OPEN">OPEN</option>
              </select>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-16 ">
          <div className="w-full overflow-hidden rounded-lg shadow-xs">
            <div className="flex flex-row space-x-3">
              <h3 className="px-4 py-3">Sort By:</h3>
              <th
                className="px-4 py-3 cursor-pointer"
                onClick={() => handleSortChange("contractTitle")}
              >
                Contract Title
              </th>
              <th
                className="px-4 py-3 cursor-pointer"
                onClick={() => handleSortChange("contractType")}
              >
                Contract Type
              </th>
              <th
                className="px-4 py-3 cursor-pointer"
                onClick={() => handleSortChange("contractStatus")}
              >
                Status
              </th>
              <th
                className="px-4 py-3 cursor-pointer"
                onClick={() => handleSortChange("createdAt")}
              >
                Last Edited
              </th>
            </div>
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead className="">
                  <tr className="">
                    <th className="px-4 py-3">Contract Title</th>
                    <th className="px-4 py-3">Contract Type</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Last Edited</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y dark:divide-gray-500">
                  {contracts.length == 0 ? (
                    <tr className="text-gray-700 ">
                      <td colSpan={5} className="px-4 py-3 text-center">
                        No contracts found
                      </td>
                    </tr>
                  ) : (
                    contracts.map((contract, i) => (
                      <>
                        <tr
                          key={i}
                          className="bg-gray-50 hover:bg-gray-100  text-gray-700 "
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center text-sm">
                              <div>
                                <p className="font-semibold">
                                  {contract.contractTitle}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {contract.contractType}
                          </td>
                          <td className="px-4 py-3 text-xs">
                            <span
                              className={` px-4 py-2 leading-tight text-neutral-950 rounded-full  ${
                                contract.contractStatus === "TERMINATE"
                                  ? "bg-red-500 text-white"
                                  : contract.contractStatus === "RENEW"
                                  ? "bg-green-600 text-white"
                                  : contract.contractStatus === "DECLINE"
                                  ? "bg-red-500 text-white"
                                  : contract.contractStatus === "EXPIRED"
                                  ? "bg-red-500 text-white"
                                  : contract.contractStatus === "OPEN"
                                  ? "bg-green-500 text-white"
                                  : contract.contractStatus ===
                                    "PENDING_SUPPLIER_ACCEPTANCE"
                                  ? "bg-purple-500 text-white"
                                  : "bg-blue-600 text-white"
                              }`}
                            >
                              {contract.contractStatus}{" "}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {new Date(contract.createdAt).toLocaleString()}
                          </td>
                          <td className="px-4 py-3 space-x-5 text-sm">
                            <button
                              className="text-blue-600 hover:underline"
                              onClick={() => handleEdit(contract.contractId)}
                            >
                              Edit
                              <FaEdit className="text-xl text-gray-900" />
                            </button>
                            <button>
                              <Link
                                className="bg-gray-50  hover:bg-gray-100  text-gray-700 "
                                to={`/dashboard/contract/view/${contract.contractId}`}
                              >
                                View
                              </Link>
                            </button>
                          </td>
                        </tr>
                      </>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {contracts.length > 0 && (
              <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase bcontract-t dark:bcontract-gray-700 bg-gray-50 sm:grid-cols-9 ">
                <span className="flex suppliers-center col-span-3">
                  Showing {startIndex}-{endIndex} of {totalItems}
                </span>
                <span className="col-span-2"></span>
                <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                  <nav aria-label="Table navigation">
                    <ul className="inline-flex suppliers-center">
                      <li>
                        <button
                          className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                          aria-label="Previous"
                          onClick={() => handlePageChange(page - 1)}
                          disabled={page === 0}
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
                          </svg>{" "}
                        </button>
                      </li>
                      {/* Render page numbers */}
                      {/* Example: */}
                      {[1, 2, 3, 4, 5].map((pageNumber) => (
                        <li key={pageNumber}>
                          <button
                            className={`px-3 py-1 rounded-md ${
                              page + 1 === pageNumber
                                ? "bg-blue-600 text-white"
                                : ""
                            } focus:outline-none focus:shadow-outline-purple`}
                            onClick={() => handlePageChange(pageNumber - 1)}
                          >
                            {pageNumber}
                          </button>
                        </li>
                      ))}
                      {/* Next button */}
                      <li>
                        <button
                          className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                          aria-label="Next"
                          onClick={() => handlePageChange(page + 1)}
                          disabled={page === totalPages - 1}
                        >
                          <svg
                            className="w-4 h-4 fill-current"
                            aria-hidden="true"
                            viewBox="0 0 20 20"
                          >
                            <path
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clip-rule="evenodd"
                              fill-rule="evenodd"
                            ></path>
                          </svg>
                        </button>
                      </li>
                    </ul>
                  </nav>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contract;
