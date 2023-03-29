import styled from 'styled-components';

export const CrewFormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  background-color: ${(props) => props.theme.body};

  .header {
    display: flex;
    background-color: ${(props) => props.theme.secondary};
    justify-content: space-evenly;
    align-items: center;
    border-radius: 6px;
    font-size: 0.9em;
    padding: 0.3em 0em 0.3em 0em;
    width: 100%;
    border: 2px solid black;
    font-size: 2em;
    font-weight: 500;

    color: ${(props) => props.theme.fontColor};
  }
`;
