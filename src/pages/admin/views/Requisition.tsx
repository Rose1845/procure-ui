import useApi from "@/hooks/useApi";
import React from "react";
import { useParams } from "react-router-dom";

function Requisition() {
  const { axiosApi } = useApi()

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
