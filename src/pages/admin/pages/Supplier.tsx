import React from "react";
import CreateSupplier from "../components/supplier/CreateSupplier";
import { Supplier } from "../types";
import { axiosApi } from "../../../api";
import { Link, useNavigate } from "react-router-dom";

function Supplier() {
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = React.useState<Supplier[]>([]);
  React.useEffect(() => {
    fetchsuppliers()
      .then((data) => setSuppliers(data))
      .catch((error) => console.error("Error fetching categries:", error));
  }, []);
  const fetchsuppliers = async () => {
    const response = await axiosApi.get("/suppliers");
    const supplier = response.data;
    console.log(supplier, "suppliers");

    return supplier;
  };
  const handleEdit = (id: number) => {
    // Redirect or open a modal for editing based on the id
    navigate(`/dashboard/update_supplier/${id}`);
    console.log(`Editing supplier with ID: ${id}`);
  };
  const handleDelete = async (id: number) => {
    try {
      // Send a DELETE request to delete the supplier with the given ID
      await axiosApi.delete(`/suppliers/${id}`);
      console.log(`Supplier with ID ${id} deleted successfully`);

      // Refresh the list of suppliers after deletion
      fetchsuppliers();
    } catch (error) {
      console.error(`Error deleting supplier with ID ${id}:`, error);
    }
  };
  return (
    <div className="pt-16">
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-blue-600 text-white">
          <Link to={"/dashboard/suppliers/add_supplier"}> Add Supllier</Link>
        </button>
      </div>
      <div className="mt-4 mx-4">
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400">
                  <th className="px-4 py-3">Supplier Name</th>
                  <th className="px-4 py-3">Contact Person</th>
                  <th className="px-4 py-3">Phone Number</th>
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
                      </button>
                      {" | "}
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleDelete(supplier.vendorId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 ">
            <span className="flex suppliers-center col-span-3">
              {" "}
              Showing 21-30 of 100{" "}
            </span>
            <span className="col-span-2"></span>
            <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
              <nav aria-label="Table navigation">
                <ul className="inline-flex suppliers-center">
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
        </div>
      </div>
    </div>
  );
}

export default Supplier;
