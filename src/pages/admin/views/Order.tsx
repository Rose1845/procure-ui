import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosApi } from "../../../api";
import { Category, PurchaseOrder } from "../types";

const OrderView = () => {
  const { id } = useParams();
  const [order, setOrder] = React.useState<PurchaseOrder>();
  useEffect(() => {
    // Fetch category data based on categoryId
    const fetchCategory = async () => {
      try {
        const response = await axiosApi.get(
          `/purchase-order/order-items/${id}`
        );
        const categoryData = response.data;
        console.log(categoryData, "categpry data");

        setOrder(categoryData);
        console.log("Category retrived successfully");
      } catch (error) {
        console.error("Error updating category:", error);
      }
    };
    fetchCategory();
  }, [id]);

  return (
    <div className="container flex justify-center items-center mx-auto mt-8 py-16">
      {order?.purchaseOrderTitle}
      {order?.approvalStatus}
      {order?.termsAndConditions}
      {order?.paymentType.toString()}
      {"/"}
      {order?.items.map((it) => (
        <div key={it.itemId}>
          <div>
            <h3>{it.itemName}</h3>
            <h3>{it.itemNumber}</h3>
            <h3>{it.unitPrice}</h3>
            <h3>{it.quantity}</h3>
            <h3>{it.totalPrice}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderView;
