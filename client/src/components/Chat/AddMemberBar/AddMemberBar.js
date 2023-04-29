import React, { useState } from 'react';
import UserSearchBox from './UserSearchBox/UserSearchBox';
import { AddMemberBarContainer } from './AddMemberBar.styles';
import { useMutation } from '@apollo/client';
import { CREATE_CREW_INVITATION } from './gql';
import ContentContainer from '../../SharedComponents/ContentContainer/ContentStyleWrapper';

function AddMemberBar({ crewId }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [flashMessage, setFlashMessage] = useState('');
  const [createCrewInvitation] = useMutation(CREATE_CREW_INVITATION);

  const sendCrewInvitation = () => {
    if (selectedUser) {
      createCrewInvitation({
        variables: {
          userId: selectedUser.value,
          crewId: crewId,
        },
        onCompleted: (data) => updateFlashMessage(data),
      });
    }
  };

  const updateFlashMessage = (response) => {
    if (response?.createCrewInvitation) {
      setFlashMessage('Invitation sent successfully!');
    } else {
      setFlashMessage("You've already sent this member an invitation");
    }
  };

  return (
    <ContentContainer height={75} width={'50vw'}>
      <AddMemberBarContainer>
        <div>{flashMessage}</div>
        <UserSearchBox
          className='add-user'
          onSelect={(user) => setSelectedUser(user)}
        />
        <div className='lrc-button' onClick={sendCrewInvitation}>
          Add User
        </div>
      </AddMemberBarContainer>
    </ContentContainer>
  );
}

export default AddMemberBar;
