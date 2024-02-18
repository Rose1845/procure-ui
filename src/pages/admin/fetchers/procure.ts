import { axiosApi } from "../../../api";

export  const fetchCategories = async () => {
  // Replace with your actual API endpoint for fetching items
  const response = await axiosApi.get("/category");
  const category = await response.data;
  console.log(category, "categories");
  return category;
};
export   const fetchcontract = async () => {
  const response = await axiosApi.get("/contract");
  const contract = response.data;
  console.log(contract, "contuisitions");
  return contract;
};
export   const fetchOrders = async () => {
  const response = await axiosApi.get("/purchase-order");
  const order = response.data;
  console.log(order, "orders");
  return order;
};
export const fetchItems = async () => {
   const response = await axiosApi.get("/items");
   const item = await response.data;
   console.log(item, "items");

   return item;
 };
export const fetchRequisitions = async () => {
  const response = await axiosApi.get("/purchase-request");
  const request = response.data;
  console.log(request, "reqsitions");
  return request;
};