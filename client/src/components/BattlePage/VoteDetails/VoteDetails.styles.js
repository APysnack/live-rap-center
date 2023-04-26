import styled from 'styled-components';

export const VoteDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1em;
  border-radius: 10px;
  background-color: ${(props) => props.theme.formBackground};
  overflow-y: scroll;
  color: white;
  height: 10em;
  width: 30vw;
  margin: 1em 0 0.5em 0;
`;

export const VoteDetailsActionsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 1em;

  .vote-detail-container {
    background-color: ${(props) => props.theme.formBackground};
    padding: 2em;
    border-radius: 10px;
    height: 10em;
    width: 15em;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .winner {
    border: 3px solid ${(props) => props.theme.tertiary};
  }

  .battler-score {
    font-size: 4em;
    font-weight: 500;
  }

  .battler-name {
    font-size: 1em;
  }

  .delete-icon {
    border-radius: 10px;
    height: 2em;
    width: 2em;
    font-size: 2em;
    cursor: pointer;

    color: ${(props) => props.theme.primaryContrast};
    &:hover {
      color: ${(props) => props.theme.tertiary};
    }
  }
`;
