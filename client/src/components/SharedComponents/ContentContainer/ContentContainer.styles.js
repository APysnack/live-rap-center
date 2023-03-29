import styled from 'styled-components';

export const ContentContainer = styled.nav`
  display: flex;
  border: 3px solid black;
  border-radius: 20px;
  margin-right: 0.6em;
  background-color: ${(props) => props.theme.primary};
`;
