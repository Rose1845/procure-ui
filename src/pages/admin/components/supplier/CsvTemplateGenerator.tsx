import React, { useState } from "react";
import { axiosApi } from "../../../../api";

const CsvTemplateGenerator: React.FC = () => {
  const [templateUrl, setTemplateUrl] = useState<string | null>(null);

  const generateTemplate = async () => {
    try {
      const response = await axiosApi.get("/suppliers/template/download/single", {
        responseType: "arraybuffer",
      });

      const blob = new Blob([response.data], { type: "application/csv" });
      const url = URL.createObjectURL(blob);
      setTemplateUrl(url);
    } catch (error) {
      console.error("Error generating template:", error);
    }
  };

  const downloadTemplate = () => {
    if (templateUrl) {
      const a = document.createElement("a");
      a.href = templateUrl;
      a.download = "single_supplier_template.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="flex pt-16 flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="mb-4">
        <button
          onClick={generateTemplate}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Generate CSV Template
        </button>
      </div>

      {templateUrl && (
        <div className="mb-4">
          <p className="font-bold">Generated CSV Template:</p>
          <button
            onClick={downloadTemplate}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Download Template
          </button>
        </div>
      )}
    </div>
  );
};

export default CsvTemplateGenerator;
