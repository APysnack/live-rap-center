import styled from 'styled-components';

export const FormWrapper = styled.div`
  .submit-button {
    display: flex;
    background-color: ${(props) => props.theme.primaryContrast};
    justify-content: space-evenly;
    align-items: center;
    border-radius: 6px;
    font-size: 0.9em;
    padding: 0.3em 0em 0.3em 0em;
    width: 100%;
    border: 2px solid black;
    margin-top: 1em;

    color: ${(props) => props.theme.primary};

    &:hover {
      background-color: ${(props) => props.theme.tertiary};
      cursor: pointer;
    }
  }
`;
