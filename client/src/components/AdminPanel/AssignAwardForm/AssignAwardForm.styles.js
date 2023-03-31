import styled from 'styled-components';

export const AssignAwardFormContainer = styled.div`
  margin-top: 1.3em;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1.2em;

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

  input {
    width: 100%;
  }
`;
