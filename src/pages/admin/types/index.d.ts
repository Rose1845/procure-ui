export interface Category {
  categoryId: number;
  categoryName: string | null;
  items: Item[]; // Adjust the type based on the actual type of 'items'
  createdAt: string;
  updatedAt: string;
}
export interface Supplier {
  vendorId: string;
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
  totalAmount: number;
  vendorId: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface PurchaseRequestData {
  purchaseRequestTitle: string;
  dueDate: string;
  termsAndConditions: string;
  items: string[];
  suppliers: string[];
}
export interface PurchaseRequest {
  purchaseRequestId: number;
  purchaseRequestTitle: string;
  dueDate: string;
  approvalStatus: string;
  termsAndConditions: string;
  items: Item[];
  suppliers: Supplier[];
  multiOfferDto: [];
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
}

export interface PurchaseRequisitiontData {
  requisitionTitle: string;
  dateNeeded: string;
  description: string;
  items: string[];
}
export type PurchaseRequisition = {
  requisitionId: number;
  requisitionTitle: string;
  dateNeeded: string;
  description: string;
  approvalStatus: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
};
export interface PurchaseOrderData {
  purchaseOrderTitle: string;
  deliveryDate: string;
  termsAndConditions: string;
  paymentType: "MPESA" | "PAYPAL";
  items: string[];
  vendorId: string;
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
  vendorId: string;
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
  vendorId: string;
}
export interface Contract {
  contractId: string;
  contractTitle: string;
  contractType: string;
  contractStartDate: string;
  contractEndDate: string;
  termsAndConditions: string;
  contractStatus: string;
  items: Item[];
  vendorId: Supplier;
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
  vendorId: string;
}
export type Invoice = {
  invoiceId: string;
  invoiceNumber: string;
  dueDate: string;
};
type DeliveryDTo = {
  deliveryDate: string;
  receivedBy: string;
  itemDToSet: Array<{
    itemId: string;
    quantityDelivered: number;
    quantityReceived: number;
  }>;
  deliveredOn: string;
  expectedOn: string;
  receivedOn: string;
};
