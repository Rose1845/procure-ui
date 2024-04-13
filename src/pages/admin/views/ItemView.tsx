import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosApi } from "../../../api";
import { Category, Item } from "../types";

const ItemView = () => {
  const { id } = useParams();
  const [item, setItem] = React.useState<Item>();
  const [category, setCategory] = React.useState<Category>();

  useEffect(() => {
    // Fetch category data based on categoryId
    const fetchItem = async () => {
      try {
        const response = await axiosApi.get(`/items/${id}`);
        const categoryData = response.data;
        console.log(categoryData, "categpry data");

        setItem(categoryData);
        console.log("Category retrived successfully");
      } catch (error) {
        console.error("Error updating category:", error);
      }
    };
    const fetchCategory = async () => {
      try {
        const response = await axiosApi.get(`/category/${item?.categoryId}`);
        const categoryData = response.data;
        console.log(categoryData, "categpry data");

        setCategory(categoryData);
        console.log("Category retrived successfully");
      } catch (error) {
        console.error("Error updating category:", error);
      }
    };
    fetchCategory();
    fetchItem()
  }, [id, item?.categoryId]);

  return (
    <div className="container flex flex-col justify-center items-center mx-auto mt-8 py-16">
     
      <div>
        Item<p>{item?.itemName}</p>
        {"/"}
        Category: {category?.categoryName}
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400">
              <th className="px-4 py-3">Item Name</th>
              <th className="px-4 py-3">Item Number</th>
              <th className="px-4 py-3">Unit Price</th>
              <th className="px-4 py-3">Quantity</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y dark:divide-gray-500">
            <tr>
              <td className="px-4 py-3">
                <div className="flex items-center text-sm">
                  <div>
                    <p className="font-semibold">{item?.itemName}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-sm">{item?.itemNumber}</td>
              <td className="px-4 py-3 text-sm">{item?.unitPrice}</td>
              <td className="px-4 py-3 text-sm">{item?.quantity}</td>
              {/* <td className="px-4 py-3 text-sm"> {new Date(item?.updatedAt).toLocaleDateString()}</td> */}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemView;
