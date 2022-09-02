import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const EventLinkContainer = styled(Link)`
  display: flex;
  border: 1px solid black;
  width: 30vw;

  div {
    margin-right: 0.4em;
  }
`;
