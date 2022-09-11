import { Link } from "react-router-dom";
import { Container, List } from "./styles";

export default function Menu() {
  return (
    <Container>
      <List>
        <Link to="/game">Game</Link>
        <Link to="/replay">Replay</Link>
      </List>
    </Container>
  );
}
