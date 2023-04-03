import React, { useState } from 'react';
import BasicModal from '../SharedComponents/BasicModal';
import { Feedback as InviteNotification } from '@mui/icons-material';
import {
  InvitationContainer,
  InvitationModalContainer,
  InvitationModalContent,
} from './InvitationModal.styles';

function InvitationModal({
  onAccept,
  onDeny,
  invitationList,
  modalOpen,
  setModalOpen,
  type,
}) {
  return (
    <InvitationModalContainer>
      {invitationList?.length > 0 ? (
        <div>
          <div
            className='lrc-button'
            style={{
              padding: '0.25em 1em 0.25em 1em',
              gap: '0.5em',
              width: '18em',
            }}
            onClick={() => setModalOpen(true)}
          >
            <InviteNotification
              className='invite-notification'
              fontSize='large'
            />
            <div>Pending {type} invites</div>
          </div>

          <BasicModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            modalClassName='invitation-modal'
          >
            <InvitationModalContent>
              <div className='title'>Pending {type} Invitations</div>
              {invitationList.map((invitation) => (
                <InvitationContainer key={invitation.id}>
                  <div>
                    {type === 'league'
                      ? invitation.leagueName
                      : invitation.name}
                  </div>
                  <div className='buttons-container'>
                    <button
                      className='lrc-button'
                      style={{
                        padding: '0.25em 1em 0.25em 1em',
                        width: '10em',
                      }}
                      onClick={() => onAccept(invitation.id)}
                    >
                      Accept
                    </button>
                    <button
                      className='lrc-button'
                      style={{
                        padding: '0.25em 1em 0.25em 1em',
                        width: '10em',
                      }}
                      onClick={() => onDeny(invitation.id)}
                    >
                      Deny
                    </button>
                  </div>
                </InvitationContainer>
              ))}
            </InvitationModalContent>
          </BasicModal>
        </div>
      ) : null}
    </InvitationModalContainer>
  );
}

export default InvitationModal;
