import styled from 'styled-components';

export const ImageModalWrapper = styled.div`
  .profileImg {
    border: 4px solid black;
  }

  .profileImg:hover {
    cursor: pointer;
  }

  .create-award-button {
    cursor: pointer;
    width: 100%;
    background-color: ${(props) => props.theme.secondary};
    color: ${(props) => props.theme.fontColor};
    padding: 1em 1.5em 1em 1.5em;
    border-radius: 5px;
    margin: 1em 0 1em 0;
    border: 2px solid black;
    align-items: center;
    text-align: center;
    justify-content: space-between;
    display: flex;
    font-size: 1.4em;

    &:hover {
      background-color: ${(props) => props.theme.tertiary};
    }

    .add {
      font-size: 1.5em;
    }
  }
`;

export const DropzoneWrapper = styled.div`
  text-align: center;
  padding: 3em 2em 3em 2em;
  border: 3px lightGrey dashed;
  max-width: 60vw;
  margin: auto;

  .btn {
    margin-top: 3em;
    border: none;
    text-align: center;
    background-color: rgb(218, 216, 216);
    height: 50px;
    border-radius: 12px;
    color: black;
    font-weight: bold;
    transition-duration: 0.6s;
    width: 80%;
  }
  .btn:hover {
    background-color: blue;
    color: aliceblue;
  }
`;
