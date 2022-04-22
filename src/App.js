import React from "react";
import styled, { keyframes } from "styled-components";

function App() {
  return (
    <Father as="header">
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Button as="a" />
      <Box>
        <span>happy imogi</span>
      </Box>
    </Father>
  );
}

const Father = styled.div``;

const Button = styled.button``;

const Input = styled.input.attrs({ required: true })`
  background-color: tomato;
`;

const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
    border-radius: 0px;
  }
  50% {
    transform: rotate(360deg);
    border-radius: 100px;
  }
  100%{
    transform: rotate(0deg);
    border-radius: 0px;
  }
`;

const Box = styled.div`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.theme.textColor};
  animation: ${rotateAnimation} 4s linear infinite;
  span {
    font-size: 36px;
    &:hover {
      font-size: 40px;
    }
    &:active {
      opacity: 0px;
    }
  }
`;

export default App;
