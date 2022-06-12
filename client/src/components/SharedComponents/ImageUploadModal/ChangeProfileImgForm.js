import React, { useState, useEffect } from "react";
import BasicModal from "../BasicModal";
import { useDispatch, useSelector } from "react-redux";
import { updateProfilePicture } from "../../../redux/userState";

function ChangeProfileImgForm({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const { user } = useSelector((state) => state.user.userState);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("name", fileName);
    formData.append("image", file);
    dispatch(updateProfilePicture(formData));
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
