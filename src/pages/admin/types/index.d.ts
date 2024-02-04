export interface Category {
  categoryId: number;
  categoryName: string | null;
  items: Item[]; // Adjust the type based on the actual type of 'items'
  createdAt: string;
  updatedAt: string;
}
export interface Supplier {
  vendorId: number;
  name: string;
  contactPerson: string;
  contactInformation: string;
  address: {
    box: string;
    country: string;
    city: string;
    location: string;
  };
  email: string;
  phoneNumber: string;
  paymentType: string;
  termsAndConditions: string;
  createdAt: Date;
  updatedAt: Date;
}
export type SupplierData = {
  name: string;
  contactPerson: string;
  contactInformation: string;
  address: {
    box: string;
    country: string;
    city: string;
    location: string;
  };
  email: string;
  phoneNumber: string;
  paymentType: string;
  termsAndConditions: string;
};

export interface PurchaseOrder {
  purchaseOrderId: number;
  purchaseOrderTitle: string;
  deliveryDate: string;
  termsAndConditions: string;
  paymentType: string;
  approvalStatus: string;
  items: Item[];
  vendorId: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface PurchaseRequestData {
  purchaseRequestTitle: string;
  dueDate: string;
  termsAndConditions: string;
  items: string[];
  vendorId: number;
}
export interface PurchaseRequisitiontData {
  requisitionTitle: string;
  dateNeeded: string;
  description: string;
  items: string[];
}
export type PurchaseRequisition ={
  requisitionTitle: string;
  dateNeeded: string;
  description: string;
  approvalStatus: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
}
export interface PurchaseOrderData {
  purchaseOrderTitle: string;
  deliveryDate: string;
  termsAndConditions: string;
  paymentType: "MPESA" | "PAYPAL";
  items: string[];
  vendorId: number;
}
export interface Item {
  itemId: string;
  itemName: string;
  itemNumber: string;
  itemDescription: string;
  quantity: number;
  unitPrice: number;
  categoryId: string;
  totalPrice: number;
  vendorId: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface ItemData {
  itemName: string;
  itemNumber: string;
  itemDescription: string;
  quantity: number;
  unitPrice: number;
  categoryId: number;
  vendorId: number;
}
export interface Contract {
  contractId: string;
  contractTitle: string;
  contractType: string;
  contractStartDate: string;
  contractEndDate: string;
  termsAndConditions: string;
  items: Item[];
  vendorId: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface ContractData {
  contractTitle: string;
  contractType: string;
  contractStartDate: string;
  contractEndDate: string;
  termsAndConditions: string;
  items: string[];
  vendorId: number;
}
export type Invoice = {
  invoiceId: string;
  invoiceNumber: string;
  dueDate: string;
  purchaseOrder: PurchaseOrder;
};
