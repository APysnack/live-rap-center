import styled from 'styled-components';

export const AddBattleToEventContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .select-component {
    margin: 0 0.6em 0 0.6em;
    min-width: 20%;
  }

  .header-container {
    padding: 0.2em;
    width: 80%;
    margin: 0.5em 0 0.5em 0;
  }

  .form-container {
    width: 80%;
    padding: 1em;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 0.5em;
    border-radius: 10px;
  }
  .lrc-button {
    padding: 0.4em;
    width: 30%;
  }

  .battler-selectors-container {
    display: flex;
  }
`;

export const BattlerSelectorContainer = styled.div`
  width: 100%;

  .battler-selector-panel {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .battler-panel-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3em;
    width: 100%;
  }
`;

export const BattlerProfilePanelContainer = styled.div`
  margin-top: 1em;
  background-color: ${(props) => props.theme.formBackground};
  padding: 2em;
  border-radius: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1em;
`;

export const BattleProjectionsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .view-stats-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .view-stats {
    margin: 2em 1em 2em 1em;
    padding: 1em;
    border-radius: 10px;
    background-color: ${(props) => props.theme.formBackground};
    font-size: small;
    width: 50%;
  }
`;
