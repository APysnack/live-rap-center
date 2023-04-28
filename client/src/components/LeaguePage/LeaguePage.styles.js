import styled from 'styled-components';

export const LeaguePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .thumb-image {
    margin-bottom: 2em;
  }

  .league-logo-container {
    padding: 2em;
    max-width: 200px;
    max-height: 200px;
  }

  .horizontal-wrapper {
    display: flex;
  }
`;

export const SummaryContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 1em;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .section-header {
    margin: 1em 0 0.5em 0;
    font-size: 2em;
    padding: 0.5em;
    border-radius: 10px;
    width: 70%;
    text-align: center;
    background-color: ${(props) => props.theme.secondary};
    border: 2px solid black;
  }

  .battles-container {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    width: 95%;
    gap: 10px 0;
  }

  .league-header-container {
    background-color: ${(props) => props.theme.formBackground};
    display: flex;
    width: 95%;
    align-items: center;
    margin-bottom: 1em;
    border-radius: 10px;
    text-align: center;
    border: 2px solid black;

    .league-name-container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      font-size: 3.5em;
      font-weight: 500;
    }

    .league-rating-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: ${(props) => props.theme.secondary};
      padding: 1em 1em 0 1em;
      border-radius: 10px 0 0 10px;
      border-right: 2px solid black;

      .score-text {
        font-size: 5em;
        color: ${(props) => props.theme.fontColor};
        font-weight: 600;
        margin-top: -0.3em;
      }

      .overall-text {
        font-size: 0.2em;
        margin-top: 4em;
        letter-spacing: 0.6em;
        margin-bottom: 2em;
        font-weight: 600;
        color: ${(props) => props.theme.fontColor};
      }

      .rank-text {
        font-size: 0.3em;
        letter-spacing: 0.6em;
        margin-top: -4em;
        margin-bottom: 2em;
        font-weight: 600;
        color: ${(props) => props.theme.fontColor};
      }
    }
  }

  .thumbnail-size-control {
    width: 30em;
    height: 7em;
    position: relative;
    transform: scale(0.75);
  }

  .info-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    border-radius: 10px;
    background-color: ${(props) => props.theme.formBackground};
    height: 80%;
    width: 95%;
    gap: 0.5em;
    overflow-y: scroll;
    margin-bottom: 3em;
  }

  .lrc-button {
    padding: 0.75em 2em 0.75em 2em;
    gap: 1em;
  }
`;

export const ScoreContainer = styled.div`
  background-color: ${(props) => props.theme.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
`;

export const EventsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;

  .header-container {
    margin-top: 0.5em;
    padding: 0.5em;
    width: 90%;
  }

  .form-background {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-top: 1em;
    background-color: ${(props) => props.theme.formBackground};
    height: 75%;
    width: 95%;
    overflow: scroll;
    padding: 1em;
    border-radius: 10px;
  }
`;

export const LeagueBattlersContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  margin-top: 1em;

  .roster-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow-y: scroll;
    gap: 0.5em;
    height: 77%;
    width: 90%;
  }

  .header-container {
    padding: 0.5em;
    width: 90%;
    margin-bottom: 0.2em;
  }

  .league-battler-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${(props) => props.theme.formBackground};
    padding: 1em;
    border-radius: 5px;
  }

  .name-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 0.5em;
  }
`;
