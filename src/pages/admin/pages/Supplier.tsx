import React from "react";
import { Supplier } from "../types";
import { axiosApi } from "../../../api";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";

function Supplier() {
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = React.useState<Supplier[]>([]);
  const [page, setPage] = React.useState<number>(0);
  const [totalPages, setTotalPages] = React.useState<number>(0);
  const [totalItems, setTotalItems] = React.useState<number>(0);
  const [sortBy, setSortBy] = React.useState<string>("createdAt"); // Default sort by createdAt
  const [sortDirection, setSortDirection] = React.useState<string>("desc"); // Default sort direction
  const [searchParams, setSearchParams] = React.useState<{ name?: string }>({});

  const pageSize = 5;
  React.useEffect(() => {
    fetchSuppliers();
  }, [page, sortBy, sortDirection]);

  const fetchSuppliers = async () => {
    try {
      let url = `/suppliers/pagination?page=${page}&size=${pageSize}`;

      if (searchParams.name) {
        url += `&name=${searchParams.name}`;
      }
      url += `&sortField=${sortBy}&sortDirection=s${sortDirection}`;
      const response = await axiosApi.get(url);
      const { content, totalPages: total, totalElements: totalItems } = response.data;
      setSuppliers(content);
      setTotalPages(total);
      setTotalItems(totalItems);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleEdit = (id: string) => {
    // Redirect or open a modal for editing based on the id
    navigate(`/dashboard/update_supplier/${id}`);
    console.log(`Editing supplier with ID: ${id}`);
  };
  const handleDelete = async (id: string) => {
    try {
      // Send a DELETE request to delete the supplier with the given ID
      await axiosApi.delete(`/suppliers/${id}`);
      console.log(`Supplier with ID ${id} deleted successfully`);

      // Refresh the list of suppliers after deletion
      fetchSuppliers();
    } catch (error) {
      console.error(`Error deleting supplier with ID ${id}:`, error);
    }
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
  const handleSearchParamsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({
      ...searchParams,
      [event.target.name]: event.target.value,
    });
  };

  const handleSearch = () => {
    fetchSuppliers();
  };
  const clearSearchParams = () => {
    setSearchParams({
      name: '',
    });
    fetchSuppliers()
  };
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const startIndex = page * pageSize + 1;
  const endIndex = Math.min((page + 1) * pageSize, totalItems);

  return (
    <div className="max-w-7xl mx-auto pt-16">
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-blue-600 text-white">
          <Link
            className="flex space-x-3"
            to={"/dashboard/suppliers/add_supplier"}
          >
            <span className="flex justify-center items-centers space-x-3">
              {" "}
              <FaPlus />
              Add Supllier
            </span>
          </Link>
        </button>
      </div>
      <div className="max-w-7xl mx-auto mr-11 pt-16 flex flex-col">
        <div className="flex flex-col justify-start">
          <div>
            <h3>Search...</h3>
            <input
              type="text"
              name="name"
              value={searchParams.name || ""}
              onChange={handleSearchParamsChange}
              placeholder="Search by name..."
              className="bg-white border border-gray-300 rounded px-3 py-1"
            />
          </div>
          <div className=" flex flex-row space-x-3 mt-3">
            <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2">
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
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400">
                  <th className="px-4 py-3 cursor-pointer text-black font-bold" onClick={() => handleSortChange("name")}>Supplier Name</th>
                  <th className="px-4 py-3">Contact Person</th>
                  <th className="px-4 py-3">Phone Number</th>
                  <th className="px-4 py-3">Email Address</th>
                  <th className="px-4 py-3">City</th>
                  <th className="px-4 py-3">Last Edited</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-500">
                {suppliers.length == 0 ? (<tr className="text-gray-700 dark:text-gray-400">
                  <td colSpan={5} className="px-4 py-3 text-center">
                    No suppliers  found
                  </td>
                </tr>
                ) : (
                  suppliers.map((supplier, i) => (
                    <tr key={i}>
                      <td className="px-4 py-3">
                        <div className="flex suppliers-center text-sm">
                          <div>
                            <p className="font-semibold">{supplier.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {supplier.contactPerson}
                      </td>

                      <td className="px-4 py-3 text-sm">
                        {supplier.phoneNumber}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {supplier.email}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {supplier.address.city}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {new Date(supplier.updatedAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <button
                          className="text-blue-600 hover:underline"
                          onClick={() => handleEdit(supplier.vendorId)}
                        >
                          Edit
                          <FaEdit className="text-xl text-gray-900" />
                        </button>
                        {" | "}
                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => handleDelete(supplier.vendorId)}
                        >
                          Delete
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))
                )}

              </tbody>
            </table>
          </div>
          <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400">
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
                      </svg>                      </button>
                  </li>
                  {/* Render page numbers */}
                  {/* Example: */}
                  {[1, 2, 3, 4, 5].map((pageNumber) => (
                    <li key={pageNumber}>
                      <button
                        className={`px-3 py-1 rounded-md ${page + 1 === pageNumber ? "bg-blue-600 text-white" : ""
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
          <div className="flex justify-end items-center space-x-3">
            <button className="px-4 py-2 text-white font-bold bg-blue-600">
              <Link to={"/dashboard/suppliers/import"}> Import from Excel</Link>
            </button>
            {
              suppliers.length > 0 && (
                <button className="px-4 py-2 text-white font-bold bg-blue-600">
                  Export to CSV
                </button>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Supplier;
