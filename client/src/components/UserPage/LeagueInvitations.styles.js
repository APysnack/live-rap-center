import styled from 'styled-components';

export const LeagueInvitationContainer = styled.div`
  margin-top: 2vh;
  display: flex;
  justify-content: space-around;
  width: 100%;
  background-color: ${(props) => props.theme.body};
`;

export const InviteNotificationContainer = styled.div`
  .invite-notification {
    color: red;
    margin-right: 0.2em;
  }
`;
