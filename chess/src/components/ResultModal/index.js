import { resetGame } from "../../services/rx";
import { Container, Title } from "./styles";

export default function Result() {
  return (
    <Container>
      <Title>Game Over</Title>
      <button onClick={() => resetGame()}>
        <span>NEW GAME</span>
      </button>
    </Container>
  );
}
