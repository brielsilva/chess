import { useState } from "react";
import SquareBoard from "../SquareBoard";
import SquareReplay from "./components/SquareReplay";
import { Container, Wrapper } from "./styles";

export default function ChessReplay({ initialPositions, list }) {
  function getXY(i) {
    const x = i % 8;
    const y = Math.abs(Math.floor(i / 8) - 7);
    return { x, y };
  }

  function isBlack(index) {
    const { x, y } = getXY(index);
    return (x + y) % 2 === 1;
  }

  function getPosition(i) {
    const { x, y } = getXY(i);
    const letter = ["a", "b", "c", "d", "e", "f", "g", "h"][x];
    return `${letter}${y + 1}`;
  }
  return (
    <Wrapper>
      <Container>
        {initialPositions.flat().map((item, index) => {
          return (
            <SquareReplay
              key={index}
              piece={item}
              position={getPosition(index)}
              list={list.data}
              color={isBlack(index) ? "#C0582B" : "#F9D3AE"}
            />
          );
        })}
        ;
      </Container>
    </Wrapper>
  );
}
