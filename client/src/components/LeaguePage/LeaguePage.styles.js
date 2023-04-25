import styled from 'styled-components';

export const LeaguePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .thumb-image {
    margin-bottom: 2em;
  }

  .league-battlers-container {
    margin: 50px 0 50px 0;
    display: flex;
    flex-direction: column;
  }

  .league-battler-container {
    display: flex;
    width: 10vw;
    justify-content: space-between;
  }

  .league-logo-container {
    background-color: red;
    padding: 2em;
    max-width: 200px;
    max-height: 200px;
  }
`;
