import React, { useState } from "react";
import { axiosApi } from "../../../../api";
import CsvTemplateGenerator from "./CsvTemplateGenerator";

const CsvUploader: React.FC = () => {
  const [template, setTemplate] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const onUpload = async (e:React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axiosApi.post("/api/suppliers/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setTemplate(`Successfully uploaded ${response.data} suppliers.`);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="flex pt-16 flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="mb-4 pt-16">
        <input
          type="file"
          accept=".csv"
          onChange={onFileChange}
          className="mb-2"
        />
        <button
          onClick={onUpload}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Upload CSV
        </button>
      </div>
      <CsvTemplateGenerator />
    </div>
  );
};

export default CsvUploader;
