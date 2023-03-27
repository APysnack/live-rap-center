import styled from 'styled-components';

export const UserPageContainer = styled.div`
  .link-container {
    display: flex;
    flex-direction: column;
  }

  .primary-content-container {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    margin-bottom: 1.2em;
  }

  .logout-button {
    background-color: ${(props) => props.theme.primaryContrast};
    padding: 0.5em 4em 0.5em 4em;
    border-radius: 7px;
    font-size: 1.2em;
    color: ${(props) => props.theme.primary};
  }

  .logout-button:hover {
    background-color: ${(props) => props.theme.tertiary};
  }

  .user-content-container {
    display: flex;
  }
`;
