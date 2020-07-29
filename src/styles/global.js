import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    border: 0;
    font-family: 'Roboto', sans-serif;
  }

  html, body, #root {
    min-height: 100%;
  }

  body {
    background: #302F39;
    -webkit-font-smoothing: antialiased !important;
  }

  input{
    background: transparent;
    border-bottom: 1px solid #4FFA7B;
  }

  button{
    background: transparent;
    border: 1px solid #4FFA7B;
    color: #FFF;
    cursor: pointer;

    &:hover{
      background: #4FFA7B;
      color: #000000;
      transition: 200ms;
    }
  }
`;
