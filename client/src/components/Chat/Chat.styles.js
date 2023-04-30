import styled from 'styled-components';

export const ChatLinkContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  height: 90%;
  width: 100%;
  margin-top: 2em;
  gap: 1em;
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
