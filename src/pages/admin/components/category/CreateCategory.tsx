import React from "react";
import { axiosApi } from "../../../../api";

function CreateCategory() {
  // const [categoryData, setCategoryData] = React.useState({
  //   categoryName: "",
  // });
  const [categoryName, setCategoryName] = React.useState<string>("");
  const handleInputChange = (e: any) => {
    const { value } = e.target;
    setCategoryName(value);
  };
  const createCategory = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const response = await axiosApi.post("/category", { categoryName });

      const createdCategory = response.data;
      console.log(createdCategory, "categor");

      console.log("Category created successfully:", createdCategory);
    } catch (error) {
      console.error("Error creating contract:", error);
    }
  };
  return (
    <div className="flex items-center justify-center p-16">
      <div className="mx-auto w-full max-w-[550px]">
        <form>
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
              value={categoryName}
              placeholder="Full Name"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div>
            <button
              onClick={createCategory}
              className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCategory;
