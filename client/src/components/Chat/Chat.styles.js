import styled from 'styled-components';

export const ChatLinkContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  height: 90%;
  width: 100%;
  margin-top: 2em;
  gap: 0.5em;
  overflow-y: scroll;

  .chat-link {
    display: flex;
    justify-content: center;
    background-color: ${(props) => props.theme.formBackground};
    padding: 1em;
    width: 80%;
    border-radius: 10px;
  }
`;

export const ChatContentsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 0.2em;

  .members-list-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const MembersListContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 90%;
  overflow-y: scroll;
  gap: 0.5em;

  .member-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1em;
    width: 90%;
    background-color: ${(props) => props.theme.formBackground};
    border-radius: 10px;
  }

  .header-container {
    width: 90%;
    padding: 0.2em;
    margin-bottom: 0.2em;
  }
`;
