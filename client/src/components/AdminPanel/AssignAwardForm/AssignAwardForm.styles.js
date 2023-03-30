import styled from 'styled-components';

export const AssignAwardFormContainer = styled.div`
  display: flex;
  align-items: center;

  .submit-button {
    width: 100%;
    background-color: ${(props) => props.theme.primaryContrast};
    color: ${(props) => props.theme.primary};
    padding: 0.5em 1.5em 0.5em 1.5em;
    border-radius: 5px;
    margin-top: 1em;
    align-items: center;
    text-align: center;
  }
`;
