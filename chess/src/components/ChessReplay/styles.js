import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  min-height: 98vh;
`;

export const Container = styled.div`
  width: 800px;
  height: 800px;
  display: grid;
  grid-template-columns: repeat(8, 100px);
  grid-template-rows: repeat(8, 100px);
`;
