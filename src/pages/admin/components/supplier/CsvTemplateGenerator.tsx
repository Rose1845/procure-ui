import React, { useState } from "react";
import { axiosApi } from "../../../../api";

const CsvTemplateGenerator: React.FC = () => {

  const downloadTemplate = async () => {
    try {
      const response = await axiosApi.get(
        "/suppliers/template/download/single",
        {
          responseType: "arraybuffer",
        }
      );

      const blob = new Blob([response.data], { type: "application/csv" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "single_supplier_template.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error generating or downloading template:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="mb-4">
        <button
          onClick={downloadTemplate}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Download CSV Template
        </button>
      </div>
    </div>
  );
};

export default CsvTemplateGenerator;
