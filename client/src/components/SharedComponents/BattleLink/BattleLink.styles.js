import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const BattleLinkContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${(props) => props.theme.primaryContrast};
  color: ${(props) => props.theme.primary};
  border-radius: 10px;
  padding: 20px;

  div {
    margin-right: 0.4em;
  }
`;
