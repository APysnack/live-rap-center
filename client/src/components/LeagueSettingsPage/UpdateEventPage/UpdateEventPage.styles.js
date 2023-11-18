import styled from 'styled-components';

export const UpdateEventPageWrapper = styled.div`
  .event-details-container {
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }

  .lrc-button {
    width: 100%;
    padding: 0.5em;
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
    }

    .battler-container-right {
      text-align: right;
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

export const FlyerUploadWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  background-color: ${(props) => props.theme.formBackground};
  padding: 1em;
  border-radius: 10px;
  gap: 1.5em;

  .flyer-text {
    color: ${(props) => props.theme.primaryContrast};
    font-size: 2em;
    font-weight: 600;
  }
`;
