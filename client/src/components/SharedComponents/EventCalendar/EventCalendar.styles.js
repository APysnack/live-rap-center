import styled from 'styled-components';

export const EventCalendarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 6em;
  color: ${(props) => props.theme.headerFontColor};

  .main-content {
    display: flex;
  }

  .month-paginator {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: ${(props) => props.theme.secondary};
    border-radius: 10px;
    border: black 2px solid;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    margin: 0 0 0.5em 0;
  }

  .paginator-items {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 95vw;
    height: 5vh;
  }

  .month-text {
    font-size: 2em;
  }

  .calendar-arrow {
    font-size: 2.5em;
    color: ${(props) => props.theme.primaryContrast};
    cursor: pointer;
    margin: 0 1em 0 1em;
  }

  .calendar-arrow:hover {
    color: ${(props) => props.theme.tertiary};
  }

  .rbc-header {
    color: ${(props) => props.theme.primaryContrast};
  }

  .my-event-class {
    color: red;
  }

  .filter-component {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1em;

    select {
      background-color: ${(props) => props.theme.primaryContrast};
      color: ${(props) => props.theme.primary};
      width: 15vw;
    }

    .filter-text {
      margin-top: 1em;
      color: ${(props) => props.theme.primaryContrast};
      font-size: 1.4em;
      font-weight: 600;
    }
  }
`;
