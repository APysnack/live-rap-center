import styled from 'styled-components';

export const InvitationContainer = styled.div`
  margin-top: 2vh;
  display: flex;
  justify-content: space-around;
  width: 100%;
  background-color: ${(props) => props.theme.body};
`;

export const InvitationModalContainer = styled.div`
  .invite-notification {
    color: ${(props) => props.theme.alert};
    margin-right: 0.2em;
  }

  .invite-icon {
    display: flex;
    align-items: center;
    margin-bottom: 1em;
    background-color: red;
    border-radius: 10px;
  }
`;
