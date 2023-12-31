// api.js

const BASE_URL = "http://localhost:8081/api/v1"; // Replace with your actual API base URL

export const createCategory = async (categoryData: any) => {
  const response = await fetch(`${BASE_URL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoryData),
  });

  if (!response.ok) {
    throw new Error("Error creating category");
  }

  const data = await response.json();
  return data;
};

export const updateCategory = async (categoryId: number, categoryData: any) => {
  const response = await fetch(`${BASE_URL}/categories/${categoryId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoryData),
  });

  if (!response.ok) {
    throw new Error("Error updating category");
  }
};

export const deleteCategory = async (categoryId: number) => {
  const response = await fetch(`${BASE_URL}/categories/${categoryId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error deleting category");
  }
};

export const getCategories = async () => {
  const response = await fetch(`${BASE_URL}/categories`);

  if (!response.ok) {
    throw new Error("Error fetching categories");
  }

  const data = await response.json();
  return data;
};
