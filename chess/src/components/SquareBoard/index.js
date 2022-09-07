import { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { gameSubject, handleMove } from "../../services/rx";
import ChessPiece from "../ChessPiece";
import Promote from "../Promote";
import { Square } from "./style";

export default function SquareBoard({ piece, color, position, set }) {
  const [promotion, setPromotion] = useState(null);
  const [, drop] = useDrop({
    accept: "piece",
    drop: (item) => {
      const [currentPosition] = item.id.split("_");
      if (currentPosition === position) {
        return;
      }
      handleMove(currentPosition, position);
    },
  });

  useEffect(() => {
    const subscribe = gameSubject.subscribe(({ pending }) => {
      pending && pending.to === position
        ? setPromotion(pending)
        : setPromotion(null);
    });
    return () => subscribe.unsubscribe();
  }, [position]);
  return (
    <Square ref={drop} color={color}>
      {promotion ? (
        <Promote promotion={promotion} />
      ) : piece ? (
        <ChessPiece piece={piece} position={position} />
      ) : null}
    </Square>
  );
}
