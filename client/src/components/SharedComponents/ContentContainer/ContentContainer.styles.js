import styled from 'styled-components';

export const ContentContainer = styled.div`
  border: 3px solid black;
  border-radius: 20px;
  margin-right: 0.6em;
  background-color: ${(props) => props.theme.primary};
`;

export const GridContainer = styled.div`
  border: 3px solid black;
  border-radius: 20px;
  background-color: ${(props) => props.theme.primary};
  margin-top: 1em;
  padding: 2em;
  width: 80%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  justify-content: center;
  align-items: center;
  gap: 1.5em;
  grid-column-gap: 1em;
`;
