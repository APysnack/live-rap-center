import React, { useState, useEffect } from "react";
import BasicModal from "../SharedComponents/BasicModal";
import api from "../../api/api";
import axios from "axios";

function ChangeProfileImgForm({ isOpen, onClose }) {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user_id", 1);
    formData.append("name", fileName);
    formData.append("image", file);
    axios
      .post(`http://localhost:3001/profile-picture`, formData)
      .then((res) => console.log(res));
  };

  return (
    <BasicModal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={onSubmit}>
        <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {fileName}
          </label>
        </div>

        <input type="submit" value="Upload" />
      </form>
    </BasicModal>
  );
}

export default ChangeProfileImgForm;
