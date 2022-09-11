import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-color: black;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 10rem;

  max-height: 20rem;

  background-color: #457824;
  overflow-x: hidden;
  overflow-y: auto;

  a {
    margin: 0.5rem;
    display: block;
    border: 1px solid black;
    color: white;
    text-decoration: none;
  }
`;
