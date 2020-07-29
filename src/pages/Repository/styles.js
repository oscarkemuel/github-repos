import styled, { keyframes, css } from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  color: #FFF;
  max-width: 700px;
  background-color: #2E2B35;
  margin: 80px auto;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: inset 0 0 1em transparent, 0 0 1em #4FFA7B;
`;

export const Main = styled.header`
  font-weight: bold;
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .link-button{
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFF;
    border: 1px solid #4FFA7B;
    text-decoration: none;
    padding: 5px 25px;
    border-radius: 10px;
    margin-bottom: 10px;
    font-size: 15px;

    &:hover{
      background-color: #4FFA7B;
      color: black;
      transition: all 200ms;
    }
  }

  h1{
    color: #4FFA7B;
  }

  p{
    text-align: center;
    max-width: 550px;
    color: yellow;
    font-size: 15px;
    line-height: 1.5;
  }

  .link-owner{
    color: salmon;
    text-decoration: none;
    border-bottom: 1px solid salmon;
  }
`;

export const Infos = styled.div`
  margin: 10px 0;
  p{
    color: pink;
    text-align: center;
    font-size: 14px;
    line-height: 1.4;
    font-weight: bold;
  }
`;

const rotate = keyframes`
  from{
    transform: rotate(0deg)
  }

  to{
    transform: rotate(360deg)
  }
`;

export const Loading = styled.div.attrs((props) => ({
  inloading: (props.loading === 'true'),
}))`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => props.inloading && css`
    svg{
      animation: ${rotate} 2s linear infinite;
    }
  `}
`;
