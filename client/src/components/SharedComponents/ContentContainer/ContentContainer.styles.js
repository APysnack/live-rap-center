import styled from 'styled-components';

export const ContentContainer = styled.nav`
  display: flex;
  flex-direction: column;
  border: 3px solid black;
  border-radius: 20px;
  padding: 0 5em 0 5em;
  justify-content: space-around;
  align-items: center;
  background-color: ${(props) => props.theme.primary};
`;
