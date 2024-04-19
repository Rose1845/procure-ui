import React, { useState } from "react";
import { DeliveryDTo } from "../../types";

const CreateDelivery: React.FC = () => {
  const [formData, setFormData] = useState<DeliveryDTo>({
    deliveryDate: "",
    receivedBy: "",
    itemDToSet: [
      {
        itemId: "",
        quantityDelivered: 0,
        quantityReceived: 0,
      },
    ],
    deliveredOn: "",
    deliveredVia:"",
    expectedOn: "",
    receivedOn: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleItemChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      itemDToSet: prevData.itemDToSet.map((item, i) =>
        i === index ? { ...item, [name]: value } : item
      ),
    }));
  };

  const addItem = () => {
    setFormData((prevData) => ({
      ...prevData,
      itemDToSet: [
        ...prevData.itemDToSet,
        {
          itemId: "",
          quantityDelivered: 0,
          quantityReceived: 0,
        },
      ],
    }));
  };

  const removeItem = (index: number) => {
    setFormData((prevData) => ({
      ...prevData,
      itemDToSet: prevData.itemDToSet.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to send formData to the backend
    console.log("Form data submitted:", formData);
  };

  return (
    <div>
      <h2>Create Delivery</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Delivered Via:
          <input
            type="text"
            name="deliveredVia"
            value={formData.deliveredVia}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Delivery Date:
          <input
            type="text"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Received By:
          <input
            type="text"
            name="receivedBy"
            value={formData.receivedBy}
            onChange={handleInputChange}
          />
        </label>
        <br />

        {/* Render items */}
        {formData.itemDToSet.map((item, index) => (
          <div key={index}>
            <h3>Item {index + 1}</h3>
            <label>
              Item ID:
              <input
                type="text"
                name="itemId"
                value={item.itemId}
                onChange={(e) => handleItemChange(e, index)}
              />
            </label>
            <br />
            <label>
              Quantity Delivered:
              <input
                type="number"
                name="quantityDelivered"
                value={item.quantityDelivered}
                onChange={(e) => handleItemChange(e, index)}
              />
            </label>
            <br />
            <label>
              Quantity Received:
              <input
                type="number"
                name="quantityReceived"
                value={item.quantityReceived}
                onChange={(e) => handleItemChange(e, index)}
              />
            </label>
            <br />
            <button type="button" onClick={() => removeItem(index)}>
              Remove Item
            </button>
          </div>
        ))}

        <button type="button" onClick={addItem}>
          Add Item
        </button>
        <br />

        <label>
          Delivered On:
          <input
            type="text"
            name="deliveredOn"
            value={formData.deliveredOn}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Expected On:
          <input
            type="text"
            name="expectedOn"
            value={formData.expectedOn}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Received On:
          <input
            type="text"
            name="receivedOn"
            value={formData.receivedOn}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <button type="submit">Create Delivery</button>
      </form>
    </div>
  );
};

export default CreateDelivery;
