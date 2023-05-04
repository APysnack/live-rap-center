import React from 'react';
import { Box, Modal } from '@mui/material';
import styled from 'styled-components';

const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme.primary};
  border: 2px solid #000;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

// NOTE: to control styles from another file, use a NEW styled component wrapper as one of the children
// see InvitationModalContent in InvitationModal.js for implementation

const BasicModal = ({
  isOpen,
  onClose,
  children,
  modalClassName = 'basic-modal',
  width = 700,
  height = 500,
}) => {
  return (
    <Modal
      disableAutoFocus={true}
      open={isOpen}
      onClose={onClose}
      className='modal'
    >
      <StyledBox width={width} height={height} className={modalClassName}>
        {children}
      </StyledBox>
    </Modal>
  );
};

export default BasicModal;
