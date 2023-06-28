import styled from 'styled-components';
import { MOBILE_VIEW_WIDTH } from '../../../globalConstants';

export const ContentContainer = styled.div`
  border: 3px solid black;
  border-radius: 20px;
  margin-right: 0.6em;
  background-color: ${(props) => props.theme.primary};

  @media (max-width: ${MOBILE_VIEW_WIDTH}) {
    width: 95% !important;
    height: fit-content !important;
    padding-bottom: 2em;
  }
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

  @media (max-width: ${MOBILE_VIEW_WIDTH}) {
    width: 95% !important;
  }
`;
