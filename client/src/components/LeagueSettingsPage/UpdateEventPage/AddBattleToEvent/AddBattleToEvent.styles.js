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
    background-color: ${(props) => props.theme.formBackground};
  }
  .lrc-button {
    padding: 0.4em;
    width: 30%;
  }
`;
