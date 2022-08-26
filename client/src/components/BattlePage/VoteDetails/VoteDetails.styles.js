import styled from 'styled-components';

export const VoteDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1em;
  margin: 0.7em;
  border-radius: 10px;
  background-color: #1982fc;
  color: white;
  width: 50%;

  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
  }
`;

export const VoteDetailsActionsWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 60vw;
`;
