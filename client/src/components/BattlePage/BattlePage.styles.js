import styled from 'styled-components';

export const BattlePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledBattleContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  .title-text {
    width: 100%;
    display: flex;
    font-size: 1.5em;
    font-weight: bold;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.3em;
    height: 2em;
    overflow: hidden;
  }

  .header-container {
    margin: 0.5em 0em 0.5em 0em;
    width: 100%;
  }
`;

export const BattleContentContainer = styled.div`
  display: flex;
`;

export const VotesContainer = styled.div`
  .header-container {
    margin: 0.25em;
    width: 48em;
  }
  .title-text {
    font-size: 2em;
  }
`;

export const StyledStatsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 2em;

  .stat-with-icon {
    display: flex;
    gap: 0.5em;
  }

  .battle-stats {
    display: flex;
    background-color: ${(props) => props.theme.secondary};
    padding: 1em;
    justify-content: space-between;
    margin-bottom: 1em;
    border: 2px solid black;
    border-radius: 10px;
    width: 90%;
  }

  .battle-results-panel {
    display: flex;
    gap: 3em;
    margin: 1.5em;
    width: 100%;
    align-items: center;
    justify-content: center;

    .battler-title {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.2em;
      margin-bottom: 0.5em;
      text-align: center;
    }
  }

  .logo-container {
    background-color: ${(props) => props.theme.formBackground};
    padding: 1.5em 4em 1.5em 4em;
    border-radius: 10px;
  }

  .battle-winner {
    border: 2px solid ${(props) => props.theme.tertiary};
  }
`;

export const BattlerLinkWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  background-color: ${(props) => props.theme.formBackground};
  padding: 2em;
  width: 40%;
  height: 20em;
  gap: 1em;

  .votes-count {
    font-size: 1.2em;
  }
`;
