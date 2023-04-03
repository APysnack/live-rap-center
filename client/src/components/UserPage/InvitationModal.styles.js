import styled from 'styled-components';

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

export const InvitationContainer = styled.div`
  margin-top: 2vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  background-color: ${(props) => props.theme.formBackground};
  padding: 1em 0 1em 0;
  border-radius: 5px;

  .buttons-container {
    margin-top: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;
    width: 100%;
  }
`;

export const InvitationModalContent = styled.div`
  padding: 2em 0 15em 0;

  .title {
    font-size: 2em;
    font-weight: 600;
  }
`;
