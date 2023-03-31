import styled from 'styled-components';

export const AwardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.primaryContrast};
  margin: 0.5em 0 0.5em 0;
  padding: 0.7em;
  width: 25em;
  border-radius: 10px;
  border: 2px solid black;
  box-shadow: 10px 5px 20px 1px rgba(0, 0, 0, 0.2);

  .award-name {
    font-size: 1.4em;
  }
  .award-icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 0.3em;
    gap: 0.4em;

    .delete {
      font-size: 3em;
    }

    .delete:hover {
      cursor: pointer;
    }
  }
`;
