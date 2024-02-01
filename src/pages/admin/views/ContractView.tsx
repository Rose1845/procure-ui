import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosApi } from "../../../api";
import { Contract } from "../types";

const ContractView = () => {
  const { id } = useParams();
  const [contract, setContract] = React.useState<Contract>();
  useEffect(() => {
    // Fetch Contract data based on ContractId
    const fetchContract = async () => {
      try {
        const response = await axiosApi.get(`/contract/contract-items/${id}`);
        setContract(response.data);
        console.log("Contract retrived successfully");
      } catch (error) {
        console.error("Error updating Contract:", error);
      }
    };
    fetchContract();
  }, [id]);

  return (
    <div className="container mx-auto mt-8 py-16">
      <div>
        <h2>{contract?.contractTitle}</h2>
        <div>
          {contract?.items.map((it) => (
            <div key={it.itemId}>
              <div>
                <h3>{it.itemName}</h3>
                <h3>{it.itemNumber}</h3>
                <h4>{it.quantity}</h4>
                <h4>{it.totalPrice}</h4>
                <p>{new Date(it.createdAt).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContractView;
