import React, { useEffect, useState } from 'react';
import ContentContainer from '../../SharedComponents/ContentContainer/ContentStyleWrapper';
import { useQuery } from '@apollo/client';
import { GET_CREW } from './gql';
import { MembersListContainer } from '../Chat.styles';

function MembersList({ chatOwnerId, isCrewChat, location }) {
  const [members, setMembers] = useState([]);

  const updateMemberList = (data) => {
    if (data?.crew?.crewChatUsers) {
      setMembers(data.crew.crewChatUsers);
    }
  };

  const { loading, refetch } = useQuery(GET_CREW, {
    variables: { id: chatOwnerId },
    onCompleted: updateMemberList,
  });

  useEffect(() => {
    refetch();
  }, [location]);

  return (
    <ContentContainer height={isCrewChat ? 600 : 750} width={'20vw'}>
      <MembersListContainer>
        <div className='header-container'>Members</div>
        {members.length > 0
          ? members.map((member) => {
              return (
                <div className='member-container' key={member.id}>
                  {member.username}
                </div>
              );
            })
          : null}
      </MembersListContainer>
    </ContentContainer>
  );
}

export default MembersList;
