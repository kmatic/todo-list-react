import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        --dark-color : #363740;
        --light-color: #F7F8FC;
    }

    *,
    *::before,
    *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    word-wrap: break-word;
    }

    body {
        margin: 0;
        font-family: 'Mulish', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
          monospace;
    }

    button {
        border: none;
        outline: none;
        color: inherit;
        font-family: inherit;
        font-size: inherit;
        cursor: pointer;
    }

    #root {
        height: 100vh;
        display: grid;
        grid-template-rows: auto 1fr;   
    }
`;

export default GlobalStyle;