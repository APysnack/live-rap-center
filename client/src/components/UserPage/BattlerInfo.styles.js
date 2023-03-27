import styled from 'styled-components';

export const HomeLeagueContainer = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1em;
`;

export const BattlerInfoContainer = styled.div`
  .horizontal-line {
    color: black;
    height: 2px;
    width: 100%;
    margin: 1em 0 1em 0;
    background-color: black;
  }

  .battler-page-button {
    width: 100%;
    background-color: ${(props) => props.theme.primaryContrast};
    color: ${(props) => props.theme.primary};
    padding: 0.5em 1.5em 0.5em 1.5em;
    border-radius: 5px;
    margin-top: 1em;
    align-items: center;
    text-align: center;
  }

  .battler-page-button:hover {
    background-color: ${(props) => props.theme.tertiary};
  }
`;
