import styled from 'styled-components';

export const CreateEventModalWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const CreateEventContainer = styled.div`
  .datepicker-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    .event-datepicker {
      margin: 0.5em 0 0.5em 0;
      border: 1px solid black;
      padding: 0.2em;
    }

    .event-calendar {
      .react-datepicker__week:nth-child(2n + 1) {
        background-color: #d3d3d3;
      }
    }
  }

  .location-selector {
    margin: 0.7em;
    width: 100%;
    border: 1px solid black;
  }
`;
