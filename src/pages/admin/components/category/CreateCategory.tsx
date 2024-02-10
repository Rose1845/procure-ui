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
    <div className="flex items-center justify-center p-16">
      <div className="mx-auto w-full max-w-[550px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label
              htmlFor="categoryName"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Category Name{" "}
            </label>
            <input
              type="text"
              // name="categoryName"
              id="categoryName"
              // onChange={handleInputChange}
              // value={categoryName}
              {...register("categoryName")}
              placeholder="Name"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            {errors.categoryName && <span>{errors.categoryName.message}</span>}
          </div>
          <div>
            <button
              // onClick={createCategory}
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
