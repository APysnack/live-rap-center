import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import ChangeFileForm from './ChangeFileForm';
import { ImageModalWrapper } from './ImageUploadModal.styles';
import Add from '@mui/icons-material/Add';

// object is an optional argument to modify the image for a particular instance
function ImageUploadModal({ type, refetch, variant, object = null }) {
  const [modelOpen, setModalOpen] = useState(false);
  const [imageSource, setImageSource] = useState('');
  const [dimensions, setDimensions] = useState({ width: 150, height: 150 });

  useEffect(() => {
    switch (type) {
      case 'profile picture':
        setImageSource(object?.profilePictureUrl);
        break;
      case 'league logo':
        setImageSource(object?.logoUrl);
        setDimensions({ width: 400, height: 100 });
        break;
      case 'battle thumbnail':
        setImageSource(object?.thumbnail);
        break;
      case 'battler image':
        setImageSource(object?.image);
        break;
      case 'event flyer':
        setImageSource(object?.flyerImageUrl);
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
          variant={variant ? variant : 'circular'}
        />
      ) : (
        <div className='create-award-button' onClick={openImageModal}>
          <div>Add Award</div>
          <Add className='add'>Upload A New Award</Add>
        </div>
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
