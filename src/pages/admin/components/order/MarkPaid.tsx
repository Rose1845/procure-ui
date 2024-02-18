import React from 'react'
import { toast } from 'react-toastify';
import { axiosApi } from '../../../../api';
import { useParams } from 'react-router-dom';

function MarkPaid() {
    const abortController = new AbortController();
    abortController.abort()

    const {id} = useParams()
      const ApproveContract = async () => {
        try {
          const response = await axiosApi.patch(
            `/purchase_order/approve/${id}?approvalStatus=CLOSED`
          );
          console.log("reponse padi",response.data)

          toast.success("Contract sent to supplier successfully");
          console.log("Response from backend:", response.data);
        } catch (error) {
          toast.error("An error occurred while sending contract to supplier");
          console.error("Error sending contract to supplier:", error);
        }
      };

  return (
    <div className='py-5'>
      <div className="flex items-center">
        <button
          onClick={ApproveContract}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300 mr-2"
        >
          MARK AS FULLY RECEIVED{" "}
        </button>
      </div>
    </div>
  );
}

export default MarkPaid