import styled from 'styled-components';

export const ImageModalWrapper = styled.div`
  .profileImg {
    border: 4px solid black;
  }

  .profileImg:hover {
    cursor: pointer;
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
