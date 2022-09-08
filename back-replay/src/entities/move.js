import { Either } from "./either.js";
export default class Move {
  constructor({ from,to,promotion }) {
    this.from = from;
    this.to = to;
    this.promotion = promotion;
  }

  static build({from,to,promotion}) {
    if(!from && !to) {
      const failure = new Either(false);
      const reason = "falta parâmetros";
      return {
        success: failure.isSuccess(),
        move: reason
      };
    }
    const move = new Move({from:from,to:to,promotion:promotion});
    const sucess = new Either(true);
    return {
      move,
      success: sucess.isSuccess()
    }
  }
}
