import React, { useState, useEffect } from "react";
import { axiosApi } from "../../../../api";
import { useParams } from "react-router-dom";

const EditCategory = () => {
  const { id } = useParams();

  const [editedCategory, setEditedCategory] = useState({
    categoryName: "",
  });

  useEffect(() => {
    // Fetch category data based on categoryId
    const fetchCategoryData = async () => {
      try {
        const response = await axiosApi.get(`/category/${id}`);
        const categoryData = response.data;
        setEditedCategory(categoryData);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchCategoryData();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedCategory((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axiosApi.put(`/category/${id}`, editedCategory);
      console.log("Category updated successfully");
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <div className="px-4 py-16 bg-white mx-8 rounded-3xl">
      <div className="max-w-7xl m-auto">
        <div className="flex items-center space-x-5">
          <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
            i
          </div>
          <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
            <h2 className="leading-relaxed">Update Category</h2>
          </div>
        </div>
        <form
          onSubmit={handleUpdateCategory}
          className="divide-y divide-gray-200"
        >
          <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
            <div className="flex flex-col">
              <label className="leading-loose">Category Name</label>
              <input
                type="text"
                id="categoryName"
                name="categoryName"
                value={editedCategory.categoryName}
                onChange={handleInputChange}
                placeholder="Category"
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
              />
            </div>
          </div>
          <div className="pt-4 flex items-center space-x-4">
            <button className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">
              Update Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
