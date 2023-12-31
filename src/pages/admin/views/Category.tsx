import React, { useEffect } from "react";
import CreateCategory from "../components/category/CreateCategory";
import axios from "axios";
interface Category {
  categoryId: number;
  categoryName: string | null;
  items: any[]; // Adjust the type based on the actual type of 'items'
  createdAt: string;
  updatedAt: string;
}
function Category() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categries:", error));
  }, []);
  const fetchCategories = async () => {
    // Replace with your actual API endpoint for fetching items
    const response = await axios.get("http://localhost:8081/api/v1/category");
    const category = await response.data;
    console.log(category, "categories");

    return category;
  };
  return (
    <div className="max-w-7xl mx-auto flex flex-col">
      <div className="flex items-center justify-center p-16">
        <ul>
          {categories.map((category) => (
            <li key={category.categoryId}>
              {category.categoryName}
              {/* {category.items.map((item) => (
                <div key={item.itemId}>
                  <p>{item.itemName}</p>
                </div>
              ))} */}
            </li>
          ))}
        </ul>
      </div>
      <CreateCategory />
    </div>
  );
}

export default Category;
