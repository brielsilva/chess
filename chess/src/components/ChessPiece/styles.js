import styled from "styled-components";

export const Image = styled.img`
  max-width: 100%;
  width: 60px;

  opacity: ${(props) => props.opacity};
`;

export const PieceContainer = styled.div`
  cursor: grab;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
