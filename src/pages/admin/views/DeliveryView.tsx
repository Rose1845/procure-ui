import React from "react";
import { useParams } from "react-router-dom";
import { Delivery } from "../types";
import useApi from "@/hooks/useApi";

const DeliveryView = () => {
  const { axiosApi } = useApi();
  const { id } = useParams();
  const [deliveredItem, setDeliveredItem] = React.useState<Delivery>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosApi.get(`/deliveries/${id}`);
        const data = response.data;
        setDeliveredItem(data);
      } catch (error) {
        console.log(error);
        setError("An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!deliveredItem) return <div>No data available</div>;
  return (
    <div className="max-w-7xl mx-auto pt-24">
      <h1 className="font-bold">Delivered Item Details</h1>
      <p>Received By: {deliveredItem.receivedBy}</p>
      <p>Delivered Via: {deliveredItem.deliveredVia}</p>

      <h3>Purchase Order Details</h3>
      <p>
        Purchase Order Title: {deliveredItem.purchaseOrder.purchaseOrderTitle}
      </p>
      {/* Add more details as needed */}
      <p>PO Status: {deliveredItem.purchaseOrder.approvalStatus}</p>
      <p>
        Issued On:{" "}
        {new Date(deliveredItem.purchaseOrder.createdAt).toLocaleDateString()}
      </p>
      <p>
        Received On: {new Date(deliveredItem.receivedOn).toLocaleDateString()}
      </p>
      <ul>
        {deliveredItem.items.map((item) => (
          <div className="w-full overflow-hidden rounded-lg shadow-xs">
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400">
                    <th className="px-4 py-3">Item Name</th>
                    <th className="px-4 py-3">Item Number</th>
                    <th className="px-4 py-3">Quantity Delivered</th>
                    <th className="px-4 py-3">Quantity Received</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y dark:divide-gray-500">
                  <tr key={item.item.itemId}>
                    <td className="px-4 py-3">
                      <div className="flex suppliers-center text-sm">
                        <div>
                          <p className="font-semibold">{item.item.itemName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {item.item.itemNumber}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {item.quantityDelivered}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {item.quantityReceived}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default DeliveryView;
