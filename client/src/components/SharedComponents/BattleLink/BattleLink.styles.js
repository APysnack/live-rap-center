import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const BattleLinkContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;

  transform: ${(props) => (props.size === 'medium' ? 'scale(0.97)' : 'none')};

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
    width: 100%;
    padding-top: 56.25%;
    margin-bottom: 0.3em;
  }

  .title-container {
    width: 100%;
    display: flex;
    font-size: 1.2em;
    font-weight: bold;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.3em;
    height: 3.5em;
    overflow: hidden;
  }
`;
