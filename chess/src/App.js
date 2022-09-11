import { useCallback, useEffect, useState } from "react";
import ChessBoard from "./components/ChessBoard/index";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  gameSubject,
  initGame,
  initReplay,
  resetBoard,
  resetGame,
} from "./services/rx";
import Result from "./components/ResultModal";
import ChessReplay from "./components/ChessReplay";
import Modal from "react-modal";
import { Title } from "./components/ResultModal/styles";
import { Link } from "react-router-dom";
Modal.setAppElement("#root");

function App({ isReplay, listMove, idReplay }) {
  const [board, setBoard] = useState([]);
  const [isGameOver, setIsGameOver] = useState(null);
  const [result, setResult] = useState(null);
  const [turn, setTurn] = useState();
  const [id, setId] = useState(0);

  useEffect(() => {
    let subscribe;
    async function test() {
      await initGame();
      subscribe = gameSubject.subscribe((game) => {
        setBoard(game.board);
        setIsGameOver(game.isGameOver);
        setResult(game.result);
        setTurn(game.turn);
        setId(game.id);
      });
    }
    if (isReplay) {
      if (board) {
        resetBoard();
      }
      initReplay(idReplay);
      subscribe = gameSubject.subscribe((game) => {
        setBoard(game.board);
        setIsGameOver(game.isGameOver);
        setResult(game.result);
        setTurn(game.turn);
        setId(game.id);
      });
    } else {
      if (board) {
        resetBoard();
      }
      test();
    }
    return () => subscribe.unsubscribe();
  }, [isReplay, idReplay]);

  const customStyle = {
    content: {
      backgroundColor: "transparent",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Modal style={customStyle} isOpen={isGameOver}>
        <Title>Game Over</Title>
        <button
          onClick={() => {
            resetBoard();
            setIsGameOver(false);
            initReplay(idReplay);
          }}
        >
          <span>REWATCH</span>
        </button>
        <Link to="/game">New Game</Link>
      </Modal>
      {isReplay ? (
        <ChessReplay initialPositions={board} list={listMove} />
      ) : (
        <ChessBoard initialPositions={board} turn={turn} />
      )}
    </DndProvider>
  );
}

export default App;
