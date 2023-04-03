import React from 'react';
import { Box, Modal } from '@mui/material';
import styled from 'styled-components';

const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 50vh;
  background-color: ${(props) => props.theme.secondary};
  border: 2px solid #000;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

// NOTE: to control styles from another file, use a NEW styled component wrapper as one of the children
// see InvitationModalContent in InvitationModal.js for implementation

const BasicModal = ({
  isOpen,
  onClose,
  children,
  modalClassName = 'basic-modal',
  width = 600,
}) => {
  return (
    <Modal open={isOpen} onClose={onClose} className='modal'>
      <StyledBox width={width} className={modalClassName}>
        {children}
      </StyledBox>
    </Modal>
  );
};

export default BasicModal;
