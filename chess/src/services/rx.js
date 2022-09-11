import { BehaviorSubject } from "rxjs";
import { Chess } from "chess.js";
import api from "./replay";

export const chess = new Chess();

export const gameSubject = new BehaviorSubject();

export async function initGame(bool) {
  const id = await api.initGameReplay();
  updateGame(null, id.success);
}

export function initReplay(id) {
  resetGame();
  updateGame(null, id);
}

export function handleMove(from, to, id) {
  console.log(id);
  const moves = chess.moves({ verbose: true }).filter((m) => m.promotion);
  if (moves.some((p) => `${p.from}:${p.to}` === `${from}:${to}`)) {
    const pendingPromo = { from, to, color: moves[0].color };
    updateGame(pendingPromo);
  }
  const { pending } = gameSubject.value;
  if (!pending) {
    move(from, to, id);
  }
}

export function handleMoveReplay(from, to, promotion) {
  if (promotion) {
    moveReplay(from, to, promotion);
  } else {
    moveReplay(from, to, null);
  }
}

export function moveReplay(from, to, promotion) {
  let tempMove = { from, to };
  if (promotion) {
    tempMove.promotion = promotion;
  }
  const legalMove = chess.move(tempMove);
  if (legalMove) {
    updateGame();
  }
}

export function move(from, to, id, promotion) {
  let tempMove = { from, to };
  if (promotion) {
    tempMove.promotion = promotion;
  }
  const legalMove = chess.move(tempMove);
  if (legalMove) {
    api.postMove(id, { from, to, promotion });
    updateGame(null, id);
  }
}

function updateGame(pending, id) {
  const isGameOver = chess.isGameOver();
  const newGame = {
    board: chess.board(),
    pending,
    isGameOver,
    turn: chess.turn(),
    result: isGameOver ? getResult() : null,
    id: id,
  };
  gameSubject.next(newGame);
}

function getResult() {
  if (chess.isCheckmate()) {
    const winner = chess.turn() === "w" ? "WHITE" : "BLACK";
    return `CHECKMATE - WINNER ${winner}`;
  } else if (chess.isDraw()) {
    let reason = "50 - MOVES - RULE";
    if (chess.isStalemate()) {
      reason = "STALEMATE";
    } else if (chess.isThreefoldRepetition()) {
      reason = "THREEFOLD REPETION";
    } else if (chess.isInsufficientMaterial()) {
      reason = "INSUFFICIENT MATERIAL";
    }
    return `DRAW - ${reason}`;
  } else {
    return "UNKNOW REASON";
  }
}

export function resetGame() {
  chess.reset();
  initGame();
}

export function resetBoard() {
  chess.reset();
}
