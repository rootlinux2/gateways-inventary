import styled from "styled-components";

export const Grid = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
export const Row = styled.div`
  display: flex;
`;

const media = {
  xs: (styles) => `
    @media only screen and (max-width: 480px) {
        ${styles}
    }
    `,
};
export const Col = styled.div`
  flex: ${(props) => props.size};
  ${(props) =>
    props.collapse &&
    media[props.collapse](`
     display: none;
    `)}
`;
