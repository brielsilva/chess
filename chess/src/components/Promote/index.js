import srcToImage from "../../database/image";
import { move } from "../../services/rx";
import { Image } from "../ChessPiece/styles";
import { Choice, Options } from "./styles";

export default function Promote({ promotion: { from, to, color } }) {
  const promotionPieces = ["r", "n", "q", "b"];
  return (
    <Options>
      {promotionPieces.map((item, index) => (
        <Choice
          key={index}
          color={index % 3 === 0 ? "#C0582B" : "#F9D3AE"}
          onClick={() => move(from, to, item)}
        >
          <Image src={srcToImage[`${promotionPieces[index]}_${color}`]} />
        </Choice>
      ))}
    </Options>
  );
}
