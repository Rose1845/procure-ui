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
    <div className="container mx-auto mt-8 py-16">
      <h2>Edit Category</h2>
      <form
        className="max-w-md mx-auto bg-white p-8 shadow-md rounded-md"
        onSubmit={handleUpdateCategory}
      >
        <label>
          Category Name:
          <input
            type="text"
            name="categoryName"
            value={editedCategory.categoryName}
            onChange={handleInputChange}
          />
        </label>
        <button>Update Category</button>
      </form>
    </div>
  );
};

export default EditCategory;
