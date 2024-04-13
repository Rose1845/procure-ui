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
  deliveryDate: string;
  dueDate: string;
  termsAndConditions: string;
  items: string[];
  suppliers: string[];
}
export interface PurchaseRequest {
  purchaseRequestId: number;
  purchaseRequestTitle: string;
  deliveryDate: string;
  dueDate: string;
  approvalStatus: string;
  termsAndConditions: string;
  items: Item[];
  suppliers: Supplier[];
  itemDetails: ItemDetail[];
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

interface ItemDetail {
  id: number;
  item: Item;
  supplier: Supplier;
  offerUnitPrice: number;
  offerTotalPrice: number;
  quoteStatus: string;
}
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
  // vendorId: string;
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
  invoiceStatus: ReactNode;
  createdAt: ReactNode;
  purchaseOrder: PurchaseOrder;
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

export type Role = {
  id: number;
  name: string;
  description: string;
  isDefault: boolean;
};

export type Authority = {
  authority: string;
};

export type User = {
  id: number;
  organization: string | null;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  phoneNumber:string;
  avatar: string;
  roles: Role[];
  enabled: boolean;
  authorities: Authority[];
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
};

export type LoginResponse = {
  token: string;
  user: User;
};
export type RegistrationResponse = {
  auth: LoginResponse;
  user: User;
};
