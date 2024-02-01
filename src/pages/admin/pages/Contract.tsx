import React from "react";
import CreateContract from "../components/contract/CreateContract";
import { useNavigate } from "react-router-dom";
import { axiosApi } from "../../../api";

function Contract() {
  const navigate = useNavigate()
  const handleEdit = (id: number) => {
    // Redirect or open a modal for editing based on the id
    navigate(`/dashboard/contract/edit/${id}`);
    console.log(`Editing contract with ID: ${id}`);
  };
  const handleDelete = async (id: number) => {
    try {
      // Send a DELETE request to delete the supplier with the given ID
      await axiosApi.delete(`/suppliers/${id}`);
      console.log(`contract with ID ${id} deleted successfully`);

      // Refresh the list of contract after deletion
      // fetchsuppliers();
    } catch (error) {
      console.error(`Error deleting contract with ID ${id}:`, error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <CreateContract />
    </div>
  );
}

export default Contract;
