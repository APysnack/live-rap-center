import styled from 'styled-components';

export const EventPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  .flyer-img {
    margin-top: 2em;
    max-width: 30vw;
  }
`;

export const EventDetailsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .header-container {
    margin: 0.5em 0 0.5em 0;
    padding: 0.3em;
    width: 90%;
  }

  .flyer-img {
    margin-top: 0.2em;
  }

  .icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0.5em;
    background-color: ${(props) => props.theme.secondary};
    border-radius: 3px;
    gap: 0.8em;
  }

  .subtext {
    font-size: 0.8em;
  }

  .details-container {
    margin-top: 2em;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 70%;
    gap: 0.5em;

    .bottom-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.3em;

      .address {
        width: 70%;
      }
      .admission {
        width: 30%;
      }
    }
  }
`;

export const BattleListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 90%;

  .scroll-section {
    margin-top: 0.6em;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 0.5em;
    overflow-y: scroll;
  }

  .header-container {
    margin: 1em 0 0em 0;
    padding: 0.2em;
    width: 90%;
  }

  .battle-container {
    display: grid;
    grid-template-columns: 1fr 0.1fr 1fr;
    align-items: center;
    width: 90%;
    background-color: ${(props) => props.theme.formBackground};
    border-radius: 5px;

    .battler-container {
      height: 100%;
      padding: 1em;
      gap: 0.3em;
      display: flex;
      flex-direction: column;
    }

    .battler-container-right {
      text-align: right;
      align-items: flex-end;
    }

    .battler-container-left {
      text-align: left;
    }

    .versus {
      background-color: ${(props) => props.theme.secondary};
      color: ${(props) => props.theme.fontColor};
      height: 100%;
      text-align: center;
      font-size: 1.1em;
      font-weight: 700;
      padding: 1em;
    }
  }
`;
