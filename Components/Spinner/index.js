import styled, { keyframes, ThemeProvider } from "styled-components";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

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



const Spinner = ({ bgColor, fgColor, radius }) => {
  const theme = {
    bt: `2px solid ${bgColor ? bgColor : "grey"}`,
    br: `2px solid ${bgColor ? bgColor : "grey"}`,
    bb: `2px solid ${bgColor ? bgColor : "grey"}`,
    bl: `4px solid ${fgColor ? fgColor : "black"}`,
    radius: radius ? radius : "24px",
  };
  return (
    <ThemeProvider theme={theme}>
      <Spin />
    </ThemeProvider>
  );
};


export default Spinner;
