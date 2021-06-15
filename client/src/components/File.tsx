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
        "http://localhost:3001/api/v1/file/post-file",
        formData
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
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
