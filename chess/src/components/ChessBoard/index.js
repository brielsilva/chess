import { useEffect, useState } from "react";
import SquareBoard from "../SquareBoard";
import { Container, Wrapper } from "./styles";

export default function ChessBoard({ initialPositions, set, turn }) {
  const [currBoard, setCurrBoard] = useState([]);

  useEffect(() => {
    setCurrBoard(
      turn === "w" ? initialPositions.flat() : initialPositions.flat().reverse()
    );
  }, [turn, initialPositions]);

  function getXY(i) {
    const x = turn === "w" ? i % 8 : Math.abs((i % 8) - 7);
    const y =
      turn === "w" ? Math.abs(Math.floor(i / 8) - 7) : Math.floor(i / 8);
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
        {currBoard.map((item, index) => {
          return (
            <SquareBoard
              set={set}
              key={index}
              piece={item}
              position={getPosition(index)}
              color={isBlack(index) ? "#C0582B" : "#F9D3AE"}
            />
          );
        })}
        ;
      </Container>
    </Wrapper>
  );
}
