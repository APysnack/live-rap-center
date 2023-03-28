import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const BattleLinkContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

  background-color: ${(props) => props.theme.primaryContrast};
  color: ${(props) => props.theme.primary};
  border-radius: 10px;
  padding: 0.2em 0 0.2em 0;

  .league-name-text {
    font-style: italic;
    font-size: 1em;
  }

  .thumbnail-container {
    position: relative;
    width: 19.5vw;
    height: 15em;
    margin-bottom: 0.3em;
  }

  .title-container {
    width: 100%;
    display: flex;
    font-size: 1.1em;
    font-weight: bold;
    justify-content: center;
    align-items: center;

    .battler-1 {
      margin-left: 0.3em;
    }
  }
`;
