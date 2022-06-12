import React, { useState } from "react";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import ChangeProfileImgForm from "./ChangeProfileImgForm";
import { ImageModalWrapper } from "./ImageUploadModal.styles";

const { REACT_APP_SERVER_URL } = process.env;

function ImageUploadModal({}) {
  const { user } = useSelector((state) => state.user.userState);
  const [profileImgModalOpen, setProfileImgModalOpen] = useState(false);

  const openImageModal = () => {
    setProfileImgModalOpen(true);
  };

  const closeImageModal = () => {
    setProfileImgModalOpen(false);
  };

  return (
    <ImageModalWrapper>
      <Avatar
        src={REACT_APP_SERVER_URL + user?.profile_picture_url}
        sx={{ width: 150, height: 150 }}
        onClick={openImageModal}
        className="profileImg"
      />
      <ChangeProfileImgForm
        isOpen={profileImgModalOpen}
        onClose={closeImageModal}
      />
    </ImageModalWrapper>
  );
}

export default ImageUploadModal;
