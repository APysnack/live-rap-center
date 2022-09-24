import React, { useState } from 'react';
import BasicModal from '../SharedComponents/BasicModal';
import { MarkEmailUnread as InviteNotification } from '@mui/icons-material';
import {
  InvitationContainer,
  InvitationModalContainer,
} from './InvitationModal.styles';

function InvitationModal({
  onAccept,
  onDeny,
  invitationList,
  modalOpen,
  setModalOpen,
  type,
}) {
  React.useEffect(() => {
    console.log(invitationList);
  }, []);

  return (
    <InvitationModalContainer>
      {invitationList?.length > 0 ? (
        <div>
          <div className='invite-icon' onClick={() => setModalOpen(true)}>
            <InviteNotification
              className='invite-notification'
              fontSize='large'
            />
            <div>Pending {type} invites</div>
          </div>
          <BasicModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
            <div>Pending {type} Invitations</div>
            {invitationList.map((invitation) => (
              <InvitationContainer key={invitation.id}>
                <div>
                  {type === 'league' ? invitation.leagueName : invitation.name}
                </div>
                <button onClick={() => onAccept(invitation.id)}>Accept</button>
                <button onClick={() => onDeny(invitation.id)}>Deny</button>
              </InvitationContainer>
            ))}
          </BasicModal>
        </div>
      ) : null}
    </InvitationModalContainer>
  );
}

export default InvitationModal;
