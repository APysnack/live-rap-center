import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const EventLinkContainer = styled(Link)`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.primary};
  margin-top: 1em;
  width: 40em;
  color: ${(props) => props.theme.primaryContrast};
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease; /* Add a transition effect to the background-color and box-shadow properties */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: ${(props) => props.theme.primaryContrast};
    border: 3px solid black;
    box-shadow: 10px 5px 20px 1px rgba(0, 0, 0, 0.2);
    color: ${(props) => props.theme.primary};

    .date-container {
      background-color: ${(props) => props.theme.secondary};
      border-right: 3px solid black;
    }
  }

  .date-container {
    width: 8em;
    height: 8em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    background-color: ${(props) => props.theme.secondary};

    .day-text {
      font-size: 3em;
      line-height: 1;
      color: ${(props) => props.theme.fontColor};
    }

    .month-text {
      font-size: 3em;
      font-weight: 700;
      line-height: 1;
      color: ${(props) => props.theme.fontColor};
    }
  }

  .event-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .event-name {
    font-size: 2em;
    font-weight: 600;
  }

  .event-details-container {
    margin-left: 1em;
  }

  .icon-box {
    margin-top: 0.7em;
    display: flex;
    align-items: center;
    gap: 0.2em;
  }
`;
