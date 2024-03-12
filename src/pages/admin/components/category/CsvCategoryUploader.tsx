/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { axiosApi } from "../../../../api";
import { toast } from "react-toastify";

const CsvCategoryUploader: React.FC = () => {
  const [template, setTemplate] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
      const response = await axiosApi.post("/category/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setTemplate(`Successfully uploaded ${response.data} categories.`);
      toast.success(`Successfully uploaded ${response.data} categories.`);
    } catch (error) {
      toast.error("Error uploading file");
      console.error("Error uploading file:", error);
    }
  };

  const downloadTemplate = async () => {
    try {
      const response = await axiosApi.get(
        "/category/template/download/single",
        {
          responseType: "arraybuffer",
        }
      );

      const blob = new Blob([response.data], { type: "application/csv" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "category_template.csv";
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
        <div className="flex flex-row-reverse  space-x-11">
          <div className="mb-4">
            <button
              onClick={onUpload}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Upload CSV
            </button>
          </div>
          <div className="mb-4">
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

export default CsvCategoryUploader;
