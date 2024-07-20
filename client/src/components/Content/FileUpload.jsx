import React, { useState } from "react";

const FileUpload = ({ fileType, setUploadFile, uploadProgress }) => {
  const [filePreview, setFilePreview] = useState(null);

  const fileAccept = {
    Audio: "audio/*",
    Video: "video/*",
    Article: "image/*",
  }[fileType] || "*/*";

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUploadFile(file);
    setFilePreview(URL.createObjectURL(file));
  };

  return (
    <>
      <div className="mb-4">
        <label className="block text-gray-700">{fileType}</label>
        <input
          type="file"
          accept={fileAccept}
          onChange={handleFileChange}
          required
        />
        {filePreview && fileType === "Video" && (
          <video src={filePreview} className="mt-4 w-full" controls />
        )}
        {filePreview && fileType === "Audio" && (
          <audio src={filePreview} className="mt-4 w-full" controls />
        )}
        {filePreview && fileType === "Article" && (
          <img src={filePreview} className="mt-4 w-full" alt="Preview" />
        )}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="mt-4">
            <div className="bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Upload progress: {uploadProgress.toFixed(2)}%
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default FileUpload;
