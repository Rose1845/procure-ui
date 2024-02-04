import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosApi } from "../../../api";
import { Category } from "../types";

const CategoryView = () => {
  const { id } = useParams();
  const [category, setCategory] = React.useState<Category>();
  useEffect(() => {
    // Fetch category data based on categoryId
    const fetchCategory = async () => {
      try {
        const response = await axiosApi.get(`/category/${id}`);
        const categoryData = response.data;
        console.log(categoryData, "categpry data");
        setCategory(categoryData);
        console.log("Category retrived successfully");
      } catch (error) {
        console.error("Error updating category:", error);
      }
    };
    fetchCategory();
  }, [id]);

  return (
    <div className="container flex flex-col justify-center items-center mx-auto mt-8 py-16">
      <h2> {category?.categoryName?.toLocaleUpperCase()}</h2>
      <div className="flex justify-start">
        <table className="w-full">
          <thead>
            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400">
              <th className="px-4 py-3">Item Name</th>
              <th className="px-4 py-3">Created On</th>
            </tr>
          </thead>
          <tbody>
            {category?.items.map((it) => (
              <tr key={it.itemId}>
                <td className="px-4 py-3">
                  <div key={it.itemId}>{it.itemName}</div>
                </td>
                <td className="px-4 py-3">
                  {" "}
                  {new Date(it.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
            <tr></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryView;
