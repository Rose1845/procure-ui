import React, { useEffect, useState } from 'react';
import { axiosApi } from '@/api';

interface SupplierViewProps {
    vendorId: string;
}

interface SupplierData {
    name: string;
    contactPerson: string;
    contactInformation: string;
    email: string;
    phoneNumber: string;
    paymentType: string;
    termsAndConditions: string;
}

const SupplierView: React.FC<SupplierViewProps> = ({ vendorId }) => {
    const [supplier, setSupplier] = useState<SupplierData | null>(null);

    useEffect(() => {
        const fetchSupplierView = async () => {
            try {
                const response = await axiosApi.get(`/api/v1/suppliers/${vendorId}`);
                setSupplier(response.data);
            } catch (error) {
                console.error('Error fetching supplier details:', error);
            }
        };

        fetchSupplierView();
    }, [vendorId]);

    if (!supplier) {
        return <div>Loading supplier details...</div>;
    }

    return (
        <div>
            <h3>Supplier Details</h3>
            <p>Name: {supplier.name}</p>
            <p>Contact Person: {supplier.contactPerson}</p>
            <p>Contact Information: {supplier.contactInformation}</p>
            <p>Email: {supplier.email}</p>
            <p>Phone Number: {supplier.phoneNumber}</p>
            <p>Payment Type: {supplier.paymentType}</p>
            <p>Terms and Conditions: {supplier.termsAndConditions}</p>
        </div>
    );
};

export default SupplierView;
