import React, { useState } from 'react';
import BasicModal from '../BasicModal';

function ConfirmationModal({
  isOpen = false,
  warning = 'WARNING',
  body = 'Are you sure you want to commit this action?',
  confirmText = 'Confirm',
  denyText = 'Deny',
  onConfirm,
  onDeny,
  onClose,
}) {
  return (
    <BasicModal isOpen={isOpen} onClose={onClose}>
      <div>{warning}</div>
      <div>{body}</div>
      <button onClick={onDeny}>{denyText}</button>
      <button onClick={onConfirm}>{confirmText}</button>
    </BasicModal>
  );
}

export default ConfirmationModal;
