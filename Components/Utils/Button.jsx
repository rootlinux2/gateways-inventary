import styled, { keyframes, ThemeProvider } from "styled-components";

const Btn = styled.button`
  background: ${(props) => props.theme.bgColor};
  border-radius: ${(props) => props.theme.borderRadius};
  border: ${(props) => props.theme.border};
  color: ${(props) => props.theme.color};
  margin: ${(props) => props.theme.margin};
  padding: ${(props) => props.theme.padding};
  &:hover {
    cursor: pointer;
  }

  ${(props) =>
    props.primary &&
    css`
      background: palevioletred;
      color: white;
    `}
`;

const Button = ({
  bgColor,
  borderRadius,
  border,
  color,
  margin,
  padding,
  children,
  onClick,
  ...otherProps
}) => {
  const theme = {
    bgColor: bgColor ? bgColor : "transparent",
    borderRadius: borderRadius ? borderRadius : "3px",
    border: border ? border : "2px solid palevioletred",
    color: color ? color : "palevioletred",
    margin: margin ? margin : " 0.5em 1em",
    padding: padding ? padding : "0.25em 1em",
  };

  return (
    <ThemeProvider theme={theme}>
      <Btn onClick={onClick} {...otherProps}>
        {children}
      </Btn>
    </ThemeProvider>
  );
};

export default Button;
