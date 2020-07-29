import styled, { keyframes, css } from 'styled-components';

export const Header = styled.div`
  background-color: #2C2B35;
  border-bottom: solid 1px #333333;
  padding: 15px;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1{
    color: #FFF;
    display: flex;
    align-items: center;
    font-size: 20px;

    svg{
      margin-right: 5px;
    }
  }
`;

export const Form = styled.form`
  margin-top: 5px;

  input{
    padding: 10px;
    color: #FFF;
    margin-right: 10px;
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

export const SubmitButton = styled.button.attrs((props) => ({
  type: 'subimit',
  disabled: (props.loading === 'true'),
}))`
  padding: 10px 15px;
  border-radius: 10px;

  &[disabled]{
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${(props) => props.disabled && css`
    svg{
      animation: ${rotate} 2s linear infinite;
    }
  `}
`;

export const Infos = styled.div.attrs((props) => ({
  inloading: (props.loading === 'true'),
}))`
  margin: 10px auto;
  display: flex;
  align-items: baseline;
  a{
    text-decoration: none;
    color: salmon;
    border-bottom: 1px solid salmon;
    font-weight: bold;

    &:hover{
      transition: all 200ms;
      color: #4FFA7B;
    }
  }
  
  ${(props) => props.err && css`
    justify-content: center;
    align-items: center;
    flex-direction: column;
    h2{ color: salmon; }
  `}

  ${(props) => props.inloading && css`
    height: 70vh;
    justify-content: center;
    align-items: center;
    svg{
      animation: ${rotate} 2s linear infinite;
    }
  `}
`;

export const UserInfo = styled.div`
  margin: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  
  p{
    color: #4FFA7B;
    font-weight: bold;
    font-size: 25px;
  }

  img{
    width: 150px;
    border-radius: 50%;
    margin: 5px auto;
  }
`;

export const ListRepo = styled.ul`
  margin: 10px 20px;

  li{
    margin: 10px auto;
    color: #4FFA7B;
    font-size: 20px;
    font-weight: bold;

    p{
      color: yellow;
      font-size: 15px;
    }

    a{
      font-size: 10px;
    }
  }
`;
