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
  const pageSize = 5;
  React.useEffect(() => {
    fetchSuppliers();
  }, [page]);

  const fetchSuppliers = async () => {
    try {
      const response = await axiosApi.get(`/suppliers/all?page=${page}&size=${pageSize}`);
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
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const startIndex = page * pageSize + 1;
  const endIndex = Math.min((page + 1) * pageSize, totalItems);

  return (
    <div className="pt-16 mr-11">
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
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400">
                  <th className="px-4 py-3">Supplier Name</th>
                  <th className="px-4 py-3">Contact Person</th>
                  <th className="px-4 py-3">Phone Number</th>
                  <th className="px-4 py-3">Email Address</th>
                  <th className="px-4 py-3">City</th>
                  <th className="px-4 py-3">Last Edited</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-500">
                {suppliers.map((supplier, i) => (
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
                ))}
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
            <button className="px-4 py-2 text-white font-bold bg-blue-600">
              Export to CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Supplier;
