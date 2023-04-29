import styled from 'styled-components';

export const ChatContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  width: 70%;
  height: 80%;
  border-radius: 10px;
  background-color: ${(props) => props.theme.formBackground};

  .test {
    background-color: red;
  }

  .messages-window {
    margin-top: 1em;
    width: 70%;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    gap: 1em;
    height: 70vh;
    overflow-y: scroll;
    margin-bottom: 1em;
  }

  .chat-message {
    width: 80%;
    border-radius: 10px;
    padding: 1em;
  }

  .to {
    background-color: ${(props) => props.theme.tertiary};
    color: ${(props) => props.theme.primary};
  }
  .from {
    background-color: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.primaryContrast};
  }
`;

// column-reverse allows scroll to start at the bottom
export const MessagesWindow = styled.div`
  overflow: scroll;
  max-height: 50vh;
  display: flex;
  flex-direction: column-reverse;
`;

export const MessageContainer = styled.div`
  width: 100%;
  background-color: red;

  .message {
    display: flex;
    padding: 1em;
    justify-content: space-between;
    margin: 0.5em;
    max-width: 100%;
    border-radius: 15px;
  }
  .to {
    background-color: #1982fc;
    color: white;
  }
  .from {
    background-color: #d3d3d3;
  }
`;

export const FormContainer = styled.form`
  width: 70%;
  display: flex;
  justify-content: center;

  .message-container {
    margin-top: 1em;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .input-field {
    padding: 0.7em;
    width: 90%;
    color: black;
  }
`;
