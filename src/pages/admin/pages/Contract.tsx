import React from "react";
import CreateContract from "../components/contract/CreateContract";
import { Link, useNavigate } from "react-router-dom";
import { axiosApi } from "../../../api";

function Contract() {
  const navigate = useNavigate();
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
    <div className="max-w-7xl pt-16 mx-auto">
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-blue-600 text-white">
          <Link to={"/dashboard/contract/add_contract"}> Add Contract</Link>
        </button>
      </div>
    </div>
  );
}

export default Contract;
