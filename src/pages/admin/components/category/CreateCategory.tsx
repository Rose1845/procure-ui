import React from "react";
import { axiosApi } from "../../../../api";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function CreateCategory() {
  // const [categoryData, setCategoryData] = React.useState({
  //   categoryName: "",
  // });
  const categorySchema = z.object({
    categoryName: z.string().min(4),
  });
  type categoryData = z.infer<typeof categorySchema>;
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<categoryData>({
    resolver: zodResolver(categorySchema),
  });
  const onSubmit = async (data: categoryData) => {
    try {
      const response = await axiosApi.post("/category", data);
      if (response.data) {
        toast.success("Category Created successfully");
      }
      const createdCategory = response.data;
      console.log(createdCategory, "categor");
      reset();
      console.log("Category created successfully:", createdCategory);
    } catch (error) {
      toast.error("an error occured");
      console.error("Error creating contract:", error);
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
            <h2 className="leading-relaxed">Create Category</h2>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="divide-y divide-gray-200"
        >
          <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
            <div className="flex flex-col">
              <label className="leading-loose">Category Name</label>
              <input
                type="text"
                id="categoryName"
                {...register("categoryName")}
                placeholder="Category"
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
              />
              {errors.categoryName && (
                <span>{errors.categoryName.message}</span>
              )}
            </div>
          </div>
          <div className="pt-4 flex items-center space-x-4">
            <button className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">
              Create Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCategory;
