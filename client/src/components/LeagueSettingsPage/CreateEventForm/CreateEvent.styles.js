import styled from 'styled-components';

export const CreateEventModalWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const CreateEventContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .form-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: ${(props) => props.theme.formBackground};
    border-radius: 10px;
    padding: 2em;
    width: 80%;
    margin-bottom: 1em;

    .subheading {
      font-size: 1.2em;
      color: ${(props) => props.theme.primaryContrast};
    }
  }

  .header-container {
    margin-top: 0.5em;
    padding: 0.3em;
    width: 80%;
    margin-bottom: 0.3em;
  }

  .datepicker-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;

    .event-datepicker {
      margin: 0.5em 0 0.5em 0;
      border: 1px solid black;
      padding: 0.2em;
      background-color: ${(props) => props.theme.primaryContrast};
      color: ${(props) => props.theme.primary};
      width: 25vw;
      padding: 0.4em;

      cursor: pointer;
    }

    .event-calendar {
      background-color: ${(props) => props.theme.formBackground};

      .react-datepicker__header {
        background-color: ${(props) => props.theme.formBackground};

        .react-datepicker__current-month,
        .react-datepicker__day-name,
        .react-datepicker-time__header {
          color: ${(props) => props.theme.fontColor};
        }
      }

      .react-datepicker__day--selected {
        background-color: ${(props) => props.theme.tertiary};
        color: ${(props) => props.theme.secondary} !important;
        font-weight: 700;
      }
      .react-datepicker__week {
        .react-datepicker__day {
          color: ${(props) => props.theme.fontColor};
        }
      }
      .react-datepicker__week:nth-child(2n) {
        background-color: ${(props) => props.theme.formBackground};
      }
      .react-datepicker__week:nth-child(2n + 1) {
        background-color: ${(props) => props.theme.secondary};
        color: ${(props) => props.theme.fontColor};
      }
      .react-datepicker__time {
        background-color: ${(props) => props.theme.formBackground};
        color: ${(props) => props.theme.primaryContrast};
      }

      .react-datepicker__time-list {
        li:hover {
          background-color: ${(props) =>
            props.theme.primaryContrast} !important;
          color: ${(props) => props.theme.primary} !important;
        }
        .react-datepicker__time-list-item--selected {
          background-color: ${(props) => props.theme.secondary} !important;
          width: 99%;
        }
      }
    }
  }

  .location-selector {
    margin: 0.7em;
    width: 25vw;
    padding: 0.4em;
    border: 1px solid black;
    background-color: ${(props) => props.theme.primaryContrast};
    color: ${(props) => props.theme.primary};
  }
`;
