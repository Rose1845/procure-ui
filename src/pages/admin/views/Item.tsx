import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosApi } from "../../../api";
import { Category, Item } from "../types";

const ItemView = () => {
  const { id } = useParams();
  const [item, setItem] = React.useState<Item>();
  useEffect(() => {
    // Fetch category data based on categoryId
    const fetchCategory = async () => {
      try {
        const response = await axiosApi.get(`/category/${id}`);
        const categoryData = response.data;
        console.log(categoryData, "categpry data");

        setItem(categoryData);
        console.log("Category retrived successfully");
      } catch (error) {
        console.error("Error updating category:", error);
      }
    };
    fetchCategory();
  }, [id]);

  return (
    <div className="container flex justify-center items-center mx-auto mt-8 py-16">
      {item?.itemName}
      {"/"}
      {item?.categoryId}
      {item?.vendorId}
    </div>
  );
};

export default ItemView;
