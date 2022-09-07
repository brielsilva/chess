import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import ChessBoard from "./components/ChessBoard/index";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { gameSubject, chess, initGame } from "./services/rx";
import Result from "./components/ResultModal";

function App() {
  const [board, setBoard] = useState([]);
  const [isGameOver, setIsGameOver] = useState(null);
  const [result, setResult] = useState(null);
  const [turn, setTurn] = useState();

  useEffect(() => {
    initGame();
    const subscribe = gameSubject.subscribe((game) => {
      setBoard(game.board);
      setIsGameOver(game.isGameOver);
      setResult(game.result);
      setTurn(game.turn);
    });
    return () => subscribe.unsubscribe();
  }, []);

  const handleCb = useCallback(
    (val) => {
      setBoard(val);
    },
    [setBoard]
  );
  // useEffect(() => {
  //   const socket = io("http://localhost:3000");
  //   socket.on("connect", () => {
  //     console.log(socket.id);
  //   });

  //   socket.on("msg", (socket) => {
  //     console.log(socket);
  //   });
  // }, []);
  return (
    <DndProvider backend={HTML5Backend}>
      {isGameOver ? (
        <Result />
      ) : (
        <ChessBoard initialPositions={board} set={handleCb} turn={turn} />
      )}
    </DndProvider>
  );
}

export default App;
