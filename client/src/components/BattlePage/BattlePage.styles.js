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
