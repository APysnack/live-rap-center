import React, { useState } from "react";
import { Box, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BasicModal = ({ isOpen, onClose, children }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};

export default BasicModal;
