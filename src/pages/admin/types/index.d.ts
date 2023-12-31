export interface Category {
  categoryId: number;
  categoryName: string | null;
  items: any[]; // Adjust the type based on the actual type of 'items'
  createdAt: string;
  updatedAt: string;
}
export interface Supplier {
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

export interface PurchaseOrder {
  purchaseOrderTitle: string;
  deliveryDate: string;
  termsAndConditions: string;
  paymentType: string;
  approvalStatus: string;
  items: {
    itemId: string;
  }[];
  supplier: {
    vendorId: number;
  };
  createdAt: Date;
  updatedAt: Date;
}
export interface Item {
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
export interface ContractData {
  contractTitle: string;
  contractType: string;
  contractStartDate: string;
  contractEndDate: string;
  termsAndConditions: string;
  items: string[]; // Assuming item IDs are strings, adjust as needed
  vendorId: number;
}

