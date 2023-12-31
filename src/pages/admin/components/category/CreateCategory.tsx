import axios from "axios";
import React from "react";

function CreateCategory() {
  const [categoryData, setCategoryData] = React.useState({
    categoryName: "",
  });
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setCategoryData((prevData) => ({ ...prevData, [name]: value }));
  };
  const createCategory = async () => {
    console.log(categoryData, "categ");
    try {
      const response = await fetch("http://localhost:8081/api/v1/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create contract: ${response.statusText}`);
      }

      const createdContract = await response;
      console.log(categoryData.categoryName);

      console.log("Category created successfully:", createdContract);
    } catch (error) {
      console.error("Error creating contract:", error);
    }
  };
  return (
    <div className="flex items-center justify-center p-16">
      <div className="mx-auto w-full max-w-[550px]">
        <form >
          <div className="mb-5">
            <label
              htmlFor="categoryName"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Category Name{" "}
            </label>
            <input
              type="text"
              name="categoryName"
              id="categoryName"
              onChange={handleInputChange}
              value={categoryData.categoryName}
              placeholder="Full Name"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div>
            <button onClick={createCategory} className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCategory;
