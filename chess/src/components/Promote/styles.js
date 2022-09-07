import styled from "styled-components";

export const Options = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  div {
    background-color: ${(props) => props.color};
    flex: 0 0 50%;
    cursor: pointer;
  }

  img {
    max-width: 100%;
    width: 150px;
  }
`;

export const Choice = styled.div`
  background-color: ${(props) => props.color};
`;
