import React from "react";
import { useParams } from "react-router-dom";
import { axiosApi } from "../../../api";

function Requisition() {
  const { id } = useParams();
  const [requisition, setRequisition] = React.useState();
  React.useEffect(() => {
    const fetchRequisition = async () => {
      try {
        const reponse = await axiosApi.get(`/purchase-requisition/${id}`);
        const quisitionData = reponse.data;
        setRequisition(quisitionData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequisition()
  }, [id]);
  return <div>
    {
      requisition
    }
  </div>;
}

export default Requisition;
