import React, { useState } from 'react';
import UserSearchBox from './UserSearchBox/UserSearchBox';
import { AddMemberBarContainer } from './AddMemberBar.styles';
import { useMutation } from '@apollo/client';
import { CREATE_CREW_INVITATION } from './gql';

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
    <AddMemberBarContainer>
      <div>{flashMessage}</div>
      <UserSearchBox onSelect={(user) => setSelectedUser(user)} />
      <div onClick={sendCrewInvitation}>Add User To Chat</div>
    </AddMemberBarContainer>
  );
}

export default AddMemberBar;
