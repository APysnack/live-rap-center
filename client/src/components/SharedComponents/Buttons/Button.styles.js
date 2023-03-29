import styled from 'styled-components';

export const BasicButtonStyle = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.primaryContrast};
  justify-content: space-evenly;
  align-items: center;
  margin-top: 10px;
  border-radius: 6px;
  font-size: 0.9em;
  padding: 0.3em 0em 0.3em 0em;
  color: ${(props) => props.theme.primary};

  &:hover {
    background-color: ${(props) => props.theme.tertiary};
    cursor: pointer;
  }
`;
