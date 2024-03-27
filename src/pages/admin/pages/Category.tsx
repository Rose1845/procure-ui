import React, { useEffect } from "react";
import { axiosApi } from "../../../api";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Item } from "../types";
interface Category {
  categoryId: number;
  categoryName: string | null;
  items: Item[]; // Adjust the type based on the actual type of 'items'
  createdAt: string;
  updatedAt: string;
}
function Category() {
  const navigate = useNavigate();
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [page, setPage] = React.useState<number>(0);
  const [totalPages, setTotalPages] = React.useState<number>(0);
  const [totalItems, setTotalItems] = React.useState<number>(0);
  const pageSize = 5; 
  useEffect(() => {
    fetchCategories();
  }, [page]);

  const fetchCategories = async () => {
    try {
      const response = await axiosApi.get(`/category/all?page=${page}&size=${pageSize}`);
      const { content, totalPages: total, totalElements: totalItems } = response.data;
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

  const handleDelete = async (id: number) => {
    try {
      await axiosApi.delete(`/category/${id}`);
      console.log(`Category with ID ${id} deleted successfully`);
      fetchCategories(); // Refresh the list of categories after deletion
    } catch (error) {
      console.error(`Error deleting category with ID ${id}:`, error);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const startIndex = page * pageSize + 1;
  const endIndex = Math.min((page + 1) * pageSize, totalItems);

  return (
    <div className="max-w-7xl mx-auto mr-11 pt-16 flex flex-col">
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-blue-600 text-white">
          <Link to={"/dashboard/category/add_category"}> Add Category</Link>
        </button>
      </div>
      <div className="pt-11">
        <div className="mt-4 mx-4">
          <div className="w-full overflow-hidden rounded-lg shadow-xs">
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400">
                    <th className="px-4 py-3">Item Category</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y dark:divide-gray-500">
                  {categories.map((category, i) => (
                    <tr key={i}>
                      {/* <Link
                        to={`/dashboard/category/view/${category.categoryId}`}
                      > */}
                      <td className="px-4 py-3">
                        <div className="flex suppliers-center text-sm">
                          <div>
                            {/* <Link
                                to={`/dashboard/category/view/${category.categoryId}`}
                              > */}{" "}
                            <p className="font-semibold">
                              {category.categoryName}
                            </p>
                            {/* </Link> */}
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3 text-sm">
                        Added on:{" "}
                        {new Date(category.createdAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <button
                          className="text-blue-600 hover:underline"
                          onClick={() => handleEdit(category.categoryId)}
                        >
                          Edit
                          <FaEdit className="text-xl text-gray-900" />
                        </button>
                        {" | "}
                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => handleDelete(category.categoryId)}
                        >
                          Delete
                          <FaTrashAlt />
                        </button>
                        <button>
                          <Link
                            to={`/dashboard/category/view/${category.categoryId}`}
                          >
                            <FaEye className="text-xl text-gray-900" />
                          </Link>
                        </button>
                      </td>
                      {/* </Link> */}
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
          </div>
        </div>
        <div className="flex justify-end items-center space-x-3">
          <button className="px-4 py-2 text-white font-bold bg-blue-600">
            <Link to={"/dashboard/category/import"}> Import from Excel</Link>
          </button>
          <button className="px-4 py-2 text-white font-bold bg-blue-600">
            Export to CSV
          </button>
        </div>
      </div>
    </div>
  );
}

export default Category;
