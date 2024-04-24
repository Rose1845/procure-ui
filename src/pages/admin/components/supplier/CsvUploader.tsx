/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { toast } from "react-toastify";
import useApi from "@/hooks/useApi";

const CsvUploader: React.FC = () => {
  const { axiosApi } = useApi();

  const [, setTemplate] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const onUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axiosApi.post("/suppliers/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setTemplate(`Successfully uploaded ${response.data} suppliers.`);

      toast.success(`Successfully uploaded ${response.data} suppliers.`);
      setSelectedFile(null);
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Error uploading file");
      }
      console.error("Error uploading file:", error);
    }
  };

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

      toast.success("Template downloaded succesfully");
    } catch (error) {
      toast.error("an error occured");
      console.error("Error generating or downloading template:", error);
    }
  };
  return (
    <div className="flex pt-16 flex-col items-center justify-start  bg-gray-100">
      <div className="mb-4 pt-16">
        <input
          type="file"
          accept=".csv"
          onChange={onFileChange}
          className="mt-1 p-2 border rounded-md w-full"
        />
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="flex flex-row-reverse  space-x-6">
          <div className="mb-4 ml-3">
            <button
              onClick={onUpload}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Upload CSV
            </button>
          </div>
          <div className="mb-4 ml-3">
            <button
              onClick={downloadTemplate}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Download CSV Template
            </button>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default CsvUploader;
