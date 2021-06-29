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
    try {
      const res = await axios.post(
        `http://localhost:3001/api/v1/file/post-file?size=${file.size}&type=${file.type}`,
        formData,
        { withCredentials: true }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadHandler = async () => {
    try {
      const res = await axios.get(
        //Need to change Here!!!
        "http://localhost:3001/api/v1/file/get-file?fileId=53aeb0d1-8ecc-4da7-a20e-eccf834c2b1e",
        { responseType: "blob", withCredentials: true }
      );
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;

      //Need to change Here!!!
      link.setAttribute("download", "Horizons TheDooo.mp4"); //or any other extension
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => e.target.files && setFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default File;
