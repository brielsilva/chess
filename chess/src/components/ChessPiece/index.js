import { Image, PieceContainer } from "./styles";
import srcToImage from "../../database/image";
import { DragPreviewImage, useDrag } from "react-dnd";

export default function ChessPiece({ piece, position }) {
  const srcImage = `${piece.type}_${piece.color}`;
  const [{ isDragging }, drag, preview] = useDrag({
    item: { id: `${position}_${srcImage}` },
    type: "piece",
    collect: (monitor) => {
      return { isDragging: !!monitor.isDragging() };
    },
  });
  return (
    <>
      <DragPreviewImage connect={preview} src={srcToImage[srcImage]} />
      <PieceContainer ref={drag}>
        <Image
          src={srcToImage[srcImage]}
          alt={srcImage}
          opacity={isDragging ? 0 : 1}
        />
      </PieceContainer>
    </>
  );
}
