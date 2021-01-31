import React from "react";
import styled, { keyframes, ThemeProvider } from "styled-components";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// const Spin = styled.div`
//   animation: ${rotate360} 1s linear infinite;
//   transform: translateZ(0);

//   border-top: 2px solid grey;
//   border-right: 2px solid grey;
//   border-bottom: 2px solid grey;
//   border-left: 4px solid black;
//   background: transparent;
//   width: 24px;
//   height: 24px;
//   border-radius: 50%;
// `;

const Spin = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);

  border-top: ${(props) => props.theme.bt};
  border-right: ${(props) => props.theme.br};
  border-bottom: ${(props) => props.theme.bb};
  border-left: ${(props) => props.theme.bl};
  background: transparent;
  width: ${(props) => props.theme.radius};
  height: ${(props) => props.theme.radius};
  border-radius: 50%;
`;

Spin.defaultProps = {
  theme: {
    bt: "2px solid grey",
    br: "2px solid grey",
    bb: "2px solid grey",
    bl: "4px solid black",
    radius: "24px",
  },
};

// Define what props.theme will look like


const Spinner = ({ bgColor, fgColor, radius }) => {
  const theme = {
    bt: `2px solid ${bgColor?bgColor:'grey'}`,
    br: `2px solid ${bgColor?bgColor:'grey'}`,
    bb: `2px solid ${bgColor?bgColor:'grey'}`,
    bl: `4px solid ${fgColor?fgColor:'black'}`,
    radius: radius?radius:'24px',
  };
  console.log(theme);
  return (
    <ThemeProvider theme={theme}>
      <Spin />
    </ThemeProvider>
  );
};

export default Spinner;
