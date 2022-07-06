import React, { useState } from "react";
import { Avatar } from "@mui/material";
import ChangeFileForm from "./ChangeFileForm";
import { ImageModalWrapper } from "./ImageUploadModal.styles";

const { REACT_APP_SERVER_URL } = process.env;

function ImageUploadModal({ type, refetch, object = null }) {
  const [modelOpen, setModalOpen] = useState(false);

  const openImageModal = () => {
    setModalOpen(true);
  };

  const closeImageModal = () => {
    setModalOpen(false);
  };

  const getImageSource = () => {
    if (type === "profile picture") {
      return REACT_APP_SERVER_URL + object?.profilePictureUrl;
    } else if (type === "league logo") {
      return REACT_APP_SERVER_URL + object?.logoUrl;
    } else if (type === "battle thumbnail") {
      return REACT_APP_SERVER_URL + object?.thumbnail;
    } else if (type === "battler image") {
      return REACT_APP_SERVER_URL + object?.image;
    } else {
      return null;
    }
  };

  return (
    <ImageModalWrapper>
      <Avatar
        src={getImageSource()}
        sx={{ width: 150, height: 150 }}
        onClick={openImageModal}
        className="profileImg"
      />
      <ChangeFileForm
        isOpen={modelOpen}
        onClose={closeImageModal}
        refetch={refetch}
        type={type}
        object={object}
      />
    </ImageModalWrapper>
  );
}

export default ImageUploadModal;
