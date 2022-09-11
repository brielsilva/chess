import { useEffect, useState } from "react";
import { gameSubject, handleMoveReplay } from "../../../services/rx";
import ChessPiece from "../../ChessPiece";
import Promote from "../../Promote";
import { Square } from "../../SquareBoard/style";

export default function SquareReplay({ piece, color, position, list }) {
  const [promotion, setPromotion] = useState(null);
  const [id, setId] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const subscribe = gameSubject.subscribe(({ pending, id }) => {
      id && setId(id);
      pending && pending.to === position
        ? setPromotion(pending)
        : setPromotion(null);
    });
    setTimeout(() => {
      if (count > list.length) {
        return;
      }
      handleMoveReplay(list[count].from, list[count].to, list[count].promotion);
      setCount((prev) => prev + 1);
    }, 1000);
    return () => {
      subscribe.unsubscribe();
    };
  }, [position, count, list]);
  return (
    <Square color={color}>
      {promotion ? (
        <Promote promotion={promotion} />
      ) : piece ? (
        <ChessPiece piece={piece} position={position} />
      ) : null}
    </Square>
  );
}
