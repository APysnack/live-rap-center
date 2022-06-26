import React, { useState } from "react";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import ChangeProfileImgForm from "./ChangeProfileImgForm";
import { ImageModalWrapper } from "./ImageUploadModal.styles";
import ChangeLeagueLogoForm from "./ChangeLeagueLogoForm";

const { REACT_APP_SERVER_URL } = process.env;

function ImageUploadModal({ type, refetch, league = null }) {
  const { user } = useSelector((state) => state.user.userState);
  const [modelOpen, setModalOpen] = useState(false);

  const openImageModal = () => {
    setModalOpen(true);
  };

  const closeImageModal = () => {
    setModalOpen(false);
  };

  const getImageSource = () => {
    if (type === "profile picture") {
      return REACT_APP_SERVER_URL + user?.profile_picture_url;
    } else if (type === "league logo") {
      return REACT_APP_SERVER_URL + league?.logoUrl;
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
      {type === "profile picture" ? (
        <ChangeProfileImgForm isOpen={modelOpen} onClose={closeImageModal} />
      ) : (
        <ChangeLeagueLogoForm
          isOpen={modelOpen}
          onClose={closeImageModal}
          refetch={refetch}
        />
      )}
    </ImageModalWrapper>
  );
}

export default ImageUploadModal;
