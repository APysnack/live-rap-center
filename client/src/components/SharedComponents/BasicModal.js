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
  padding: 40;
`;

const BasicModal = ({ isOpen, onClose, children, width = 600 }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <StyledBox width={width}>{children}</StyledBox>
    </Modal>
  );
};

export default BasicModal;
