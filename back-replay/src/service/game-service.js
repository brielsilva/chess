import Move from "../entities/move.js";

class GameService {
    constructor(move) {
        this.move = move;
    }

    create(item) {
        return this.move.build(item);
    }

    save() {
        console.log("Hi");
        return new Move();
    }
}

export default new GameService(Move);
