/* eslint-disable react/prop-types */
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import { FaFilePdf } from "react-icons/fa";

const LinkedInPdfUploader = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setSelectedFile(file);
        if (onFileUpload) {
          onFileUpload(file);
        }
      }
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`p-6 border-2 border-dashed min-h-[200px] rounded-md cursor-pointer transition-colors duration-200 ${
        isDragActive ? "border-blue-500" : "border-gray-500"
      } bg-gray-800 text-gray-700`}
    >
      <input {...getInputProps()} />
      {selectedFile ? (
        <div className="flex flex-col items-center">
          <p className="mb-2">
            Uploaded file:{" "}
            <span className="text-blue-300">{selectedFile.name}</span>
          </p>
          {/* <FaFilePdf className="mt-4 text-red-500" size={48} /> */}
          <p className="text-sm text-gray-400">Click to change file</p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          {isDragActive ? (
            <p className="text-blue-300">Drop the PDF here...</p>
          ) : (
            <p>Drag &amp; drop your LinkedIn PDF here, or click to select</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LinkedInPdfUploader;
