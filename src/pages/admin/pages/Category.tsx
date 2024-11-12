import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { Item } from "../types";
import useApi from "@/hooks/useApi";
interface Category {
  categoryId: number;
  categoryName: string | null;
  items: Item[]; // Adjust the type based on the actual type of 'items'
  createdAt: string;
  updatedAt: string;
}
function Category() {
  const { axiosApi } = useApi();
  const navigate = useNavigate();
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [page, setPage] = React.useState<number>(0);
  const [totalPages, setTotalPages] = React.useState<number>(0);
  const [totalItems, setTotalItems] = React.useState<number>(0);
  const pageSize = 5;
  const [searchParams, setSearchParams] = React.useState<{
    categoryName?: string;
  }>({});
  React.useEffect(() => {
    fetchCategories();
  }, [page, pageSize]); // Added selectedSupplier to useEffect dependencies

  const fetchCategories = async () => {
    try {
      let url = `/category/pagination/categories?page=${page}&size=${pageSize}`;

      if (searchParams.categoryName) {
        url += `&categoryName=${searchParams.categoryName}`;
      }
      const response = await axiosApi.get(url);
      const {
        content,
        totalPages: total,
        totalElements: totalItems,
      } = response.data;
      setCategories(content);
      setTotalPages(total);
      setTotalItems(totalItems);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/dashboard/category/edit/${id}`);
    console.log(`Editing Category with ID: ${id}`);
  };

 
  const handleSearchParamsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchParams({
      ...searchParams,
      [event.target.name]: event.target.value,
    });
  };
  const handleExport = async () => {
    try {
      const response = await axiosApi.get("/category/export/categories", {
        responseType: "blob", 
      });

      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", "categories.csv");
      document.body.appendChild(link);
      link.click();
      link.remove(); // Clean up
    } catch (error) {
      console.error("Error exporting categories:", error);
    }
  };

  const handleSearch = () => {
    fetchCategories();
  };
  const clearSearchParams = () => {
    setSearchParams({
      categoryName: "",
    });
    fetchCategories();
  };
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const startIndex = page * pageSize + 1;
  const endIndex = Math.min((page + 1) * pageSize, totalItems);

  return (
    <div className="max-w-7xl mx-auto  pt-16 flex flex-col">
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-blue-600 text-white">
          <Link to={"/dashboard/category/add_category"}> Add Category</Link>
        </button>
      </div>
      <div className="flex flex-row justify-evenly">
        <div className="shadow w-[300px]  h-[200px] pt-16 flex flex-col justify-start">
          <div>
            <h3>Search...</h3>
            <input
              type="text"
              name="categoryName"
              value={searchParams.categoryName || ""}
              onChange={handleSearchParamsChange}
              placeholder="Search by category  name..."
              className="bg-white border border-gray-300 rounded px-3 py-1"
            />
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
        <div className="flex flex-1 flex-col justify-end  pt-16 ">
          <div className="w-full overflow-hidden rounded-lg shadow-xs">
            <div className="w-full shadow overflow-x-auto">
              <table className="w-full">
                <thead className="">
                  <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400">
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Last Edited</th>
                    <th className="px-4  py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y dark:divide-gray-500">
                  {categories.length == 0 ? (
                    <tr className="text-gray-700 ">
                      <td colSpan={5} className="px-4 py-3 text-center">
                        No categories found
                      </td>
                    </tr>
                  ) : (
                    categories.map((order, i) => (
                      <>
                        <tr
                          key={i}
                          className="bg-gray-50 hover:bg-gray-100  text-gray-700 "
                        >
                          <td className="px-4 py-3 text-sm">
                            {order.categoryName}
                          </td>

                          <td className="px-4 py-3 text-sm">
                            {new Date(order.createdAt).toLocaleString()}
                          </td>
                          <td className="px-4 py-3 space-x-5 text-sm">
                            <button
                              className="text-blue-600 hover:underline"
                              onClick={() => handleEdit(order.categoryId)}
                            >
                              Edit
                              <FaEdit className="text-xl text-gray-900" />
                            </button>
                            {" | "}
                            {/* <button
                              className="text-red-600 hover:underline"
                              onClick={() => handleDelete(order.categoryId)}
                            >
                              Delete
                              <FaTrashAlt />
                            </button> */}
                            <button>
                              <Link
                                className="bg-gray-50  hover:bg-gray-100  text-gray-700 "
                                to={`/dashboard/category/view/${order.categoryId}`}
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
            {categories.length > 0 && (
              <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 ">
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
          {categories.length > 0 && (
            <div className="flex mt-3 justify-end items-center space-x-3">
              <button className="px-4 py-2 text-white font-bold bg-blue-600">
                <Link to={"/dashboard/category/import"}>
                  {" "}
                  Import from Excel
                </Link>
              </button>
              <button
                onClick={handleExport}
                className="px-4 py-2 text-white font-bold bg-blue-600"
              >
                Export to CSV
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Category;
