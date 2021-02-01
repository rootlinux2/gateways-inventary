import styled from "styled-components";

const Grilla = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
export const Grid = (props)=> <Grilla {...props} />

const Rw = styled.div`
  display: flex;
`;

export const Row = (props)=> <Rw {...props} />

const media = {
  xs: (styles) => `
    @media only screen and (max-width: 480px) {
        ${styles}
    }
    `,
};

const Cl = styled.div`
  flex: ${(props) => props.size};
  ${(props) =>
    props.collapse &&
    media[props.collapse](`
     display: none;
    `)}
`;

export const Col = (props)=> <Cl {...props} />