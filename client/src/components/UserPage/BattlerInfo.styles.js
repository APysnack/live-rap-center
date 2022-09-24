import styled from 'styled-components';

export const HomeLeagueContainer = styled.nav`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid black;
  margin: 1em;
`;

export const BattlerInfoContainer = styled.div`
  border: 2px solid black;
  border-radius: 20px;
  padding: 2em;

  .horizontal-line {
    color: black;
    height: 2px;
    width: 100%;
    margin: 1em 0 1em 0;
    background-color: black;
  }

  .button {
    width: 100%;
    background-color: black;
    color: white;
    padding: 0.5em 1.5em 0.5em 1.5em;
    border-radius: 5px;
    border: 3px solid #088f8f;
    margin-top: 1em;
    align-items: center;
    text-align: center;
  }
`;
