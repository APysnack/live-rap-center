import styled from 'styled-components';

export const ChatContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;
  width: 95%;
  height: 85%;
  border-radius: 10px;
  background-color: ${(props) => props.theme.formBackground};

  .test {
    background-color: red;
  }

  .messages-window {
    margin-top: 1em;
    width: 100%;
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

export const FormContainer = styled.form`
  margin-top: 1.2em;
  width: 95%;
  display: flex;
  justify-content: center;
  align-items: center;

  .message-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .input-wrapper {
    position: relative;
    width: 100%;
  }

  .input-field {
    padding: 0.7em;
    width: 100%;
    color: ${(props) => props.theme.fontColor};
    border-radius: 2px;
    background-color: ${(props) => props.theme.formBackground};
  }

  .emoji-opener {
    cursor: pointer;
    font-size: 2em;
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 10px;
  }
`;

export const EmojiPickerContainer = styled.div`
  position: absolute;
  top: -5px;
  right: 0;
  transform: translate(0, -100%);
`;
