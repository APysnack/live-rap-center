import styled from "styled-components";

export const ChatContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

// column-reverse allows scroll to start at the bottom
export const MessagesWindow = styled.div`
  overflow: scroll;
  max-height: 50vh;
  display: flex;
  flex-direction: column-reverse;
`;

export const MessageContainer = styled.div`
  .message {
    display: flex;
    padding: 1em;
    justify-content: space-between;
    margin: 0.5em;
    width: 50vw;
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
