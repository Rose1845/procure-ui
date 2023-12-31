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
  updatedAt:  string
}

