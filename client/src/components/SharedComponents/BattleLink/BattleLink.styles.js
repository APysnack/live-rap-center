import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const BattleLinkContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.primaryContrast};
  color: ${(props) => props.theme.primary};
  border-radius: 10px;
  padding: 1.4em;

  .thumbnail-container {
    position: relative;
    width: 30em;
    height: 15em;
  }

  .title-container {
    width: '100vw';
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
