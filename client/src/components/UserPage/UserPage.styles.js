import styled from 'styled-components';

export const UserPageContainer = styled.div`
  .link-container {
    display: flex;
    flex-direction: column;
  }

  .primary-content-container {
    display: flex;
    justify-content: space-around;
    width: 100vw;
    margin-bottom: 1.2em;
  }

  .user-info {
    display: flex;
    flex-direction: column;
    border: 2px solid black;
    border-radius: 20px;
    padding: 0 5em 0 5em;
    justify-content: space-around;
    align-items: center;
  }
`;