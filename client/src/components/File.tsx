import axios from "axios";
import React, { useState } from "react";

const File = () => {
  const [file, setFile] = useState<any>(null);

  const handleUpload = async () => {
    if (file === null) {
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("test", "test data");
    try {
      const res = await axios.post(
        `http://localhost:3001/api/v1/file/post-file?size=${file.size}`,
        formData
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadHandler = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3001/api/v1/file/get-file?fileId=1d2d2739-2ab8-45a7-b94a-391a0d172255",
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "password.txt"); //or any other extension
      document.body.appendChild(link);
      link.click();
    } catch (error) {}
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => e.target.files && setFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={downloadHandler}>Download</button>
    </div>
  );
};

export default File;
