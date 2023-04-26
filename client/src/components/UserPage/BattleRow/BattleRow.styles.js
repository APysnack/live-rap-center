import styled from 'styled-components';

export const BattleRowContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  .battles-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 83vw;
    height: 24em;

    .battle {
      width: 25em;
      height: 22em;
    }
  }
`;
