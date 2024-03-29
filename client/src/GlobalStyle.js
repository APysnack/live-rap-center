import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  .lrc-button {
    display: flex;
    background-color: ${(props) => props.theme.primaryContrast};
    justify-content: space-evenly;
    align-items: center;
    margin-top: 10px;
    border-radius: 6px;
    font-size: 0.9em;
    border: 1px solid black;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

    color: ${(props) => props.theme.primary};

    &:hover {
        background-color: ${(props) => props.theme.tertiary};
    }
  }

  .header-container{
    display: flex;
    background-color: ${(props) => props.theme.secondary};
    justify-content: space-evenly;
    align-items: center;
    border-radius: 6px;
    border: 2px solid black;
    font-size: 2em;
    font-weight: 500;

    color: ${(props) => props.theme.fontColor};
  }

  body {
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.fontColor};
    color: ${(props) => props.theme.fontFamily};
  }


  scrollbar-width: thin;
  scrollbar-color: #777 #555;

  ::-webkit-scrollbar {
    width: 0.5vw;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #777;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: #5555;
  }
  ::-webkit-scrollbar-corner {
    background: transparent;
  }
  
`;

export default GlobalStyle;
