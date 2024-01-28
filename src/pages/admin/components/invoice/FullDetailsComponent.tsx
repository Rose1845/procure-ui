import React from 'react';

interface Address {
  box: string;
  country: string;
  city: string;
  location: string;
}

interface Supplier {
  vendorId: number;
  name: string;
  contactPerson: string;
  contactInformation: string;
  address: Address;
  email: string;
  phoneNumber: string;
  paymentType: string;
  termsAndConditions: string;
  createdAt: string;
  updatedAt: string;
}

interface Item {
  itemId: string;
  itemName: string;
  itemNumber: string;
  itemDescription: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

interface PurchaseOrder {
  purchaseOrderId: number;
  purchaseOrderTitle: string;
  deliveryDate: string;
  termsAndConditions: string;
  paymentType: string;
  approvalStatus: string;
  createdAt: string;
  updatedAt: string;
  items: Item[];
  supplier: Supplier;
}

interface Invoice {
  invoiceId: string;
  invoiceNumber: string;
  dueDate: string;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  purchaseOrder: PurchaseOrder;
}

const FullDetailsComponent: React.FC<Invoice> = ({ invoiceNumber, dueDate, totalAmount, createdAt, updatedAt, purchaseOrder }) => (
  <div>
    <h1>Full Details</h1>
    <p>Invoice Number: {invoiceNumber}</p>
    <p>Due Date: {dueDate}</p>
    <p>Total Amount: {totalAmount}</p>
    <p>Created At: {createdAt}</p>
    <p>Updated At: {updatedAt}</p>

    {purchaseOrder && (
      <div>
        <h2>Purchase Order Details</h2>
        <p>Title: {purchaseOrder.purchaseOrderTitle}</p>
        <p>Delivery Date: {purchaseOrder.deliveryDate}</p>
        <p>Terms and Conditions: {purchaseOrder.termsAndConditions}</p>
        <p>Payment Type: {purchaseOrder.paymentType}</p>
        <p>Approval Status: {purchaseOrder.approvalStatus}</p>
        <p>Created At: {purchaseOrder.createdAt}</p>
        <p>Updated At: {purchaseOrder.updatedAt}</p>

        {purchaseOrder.supplier && (
          <>
            <h3>Supplier Details</h3>
            <p>Name: {purchaseOrder.supplier.name}</p>
            <p>Contact Person: {purchaseOrder.supplier.contactPerson}</p>
            <p>Email: {purchaseOrder.supplier.email}</p>
            {/* Add more supplier details here */}
            <h4>Address</h4>
            <p>Box: {purchaseOrder.supplier.address.box}</p>
            <p>Country: {purchaseOrder.supplier.address.country}</p>
            <p>City: {purchaseOrder.supplier.address.city}</p>
            <p>Location: {purchaseOrder.supplier.address.location}</p>
          </>
        )}

        {purchaseOrder.items.length > 0 && (
          <>
            <h3>Items</h3>
            {purchaseOrder.items.map(item => (
              <div key={item.itemId}>
                <p>Item Name: {item.itemName}</p>
                <p>Item Number: {item.itemNumber}</p>
                <p>Item Description: {item.itemDescription}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Unit Price: {item.unitPrice}</p>
                <p>Total Price: {item.totalPrice}</p>
                <p>Created At: {item.createdAt}</p>
                <p>Updated At: {item.updatedAt}</p>
              </div>
            ))}
          </>
        )}
      </div>
    )}
  </div>
);

export default FullDetailsComponent;
