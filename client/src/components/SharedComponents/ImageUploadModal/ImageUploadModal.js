import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import ChangeFileForm from './ChangeFileForm';
import { ImageModalWrapper } from './ImageUploadModal.styles';

const { REACT_APP_SERVER_URL } = process.env;

// object is an optional argument to modify the image for a particular instance
function ImageUploadModal({ type, refetch, object = null }) {
  const [modelOpen, setModalOpen] = useState(false);
  const [imageSource, setImageSource] = useState('');
  const [dimensions, setDimensions] = useState({ width: 150, height: 150 });

  useEffect(() => {
    switch (type) {
      case 'profile picture':
        setImageSource(REACT_APP_SERVER_URL + object?.profilePictureUrl);
        break;
      case 'league logo':
        setImageSource(REACT_APP_SERVER_URL + object?.logoUrl);
        break;
      case 'battle thumbnail':
        setImageSource(REACT_APP_SERVER_URL + object?.thumbnail);
        break;
      case 'battler image':
        setImageSource(REACT_APP_SERVER_URL + object?.image);
        break;
      case 'event flyer':
        setImageSource(REACT_APP_SERVER_URL + object?.flyerImageUrl);
        break;
      default:
        setImageSource('');
    }
  }, [object]);

  const openImageModal = () => {
    setModalOpen(true);
  };

  const closeImageModal = () => {
    setModalOpen(false);
  };

  return (
    <ImageModalWrapper>
      {type !== 'award image' ? (
        <Avatar
          src={imageSource}
          sx={{ width: dimensions.width, height: dimensions.height }}
          onClick={openImageModal}
          className='profileImg'
        />
      ) : (
        <div onClick={openImageModal}>Upload A New Award</div>
      )}

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
