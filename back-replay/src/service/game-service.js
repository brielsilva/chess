import Move from "../entities/move.js";
import gameRepository from "../repository/game-repository.js";

class GameService {
  constructor(move, repository) {
    this.move = move;
    this.repository = repository;
  }

  create(item) {
    return this.move.build(item);
  }

  async save(item, onto) {
    const data = await this.repository.create(item, onto);
    return data;
  }

  async find(id) {
    const data = await this.repository.findFile(id);
    return data[1];
  }

  async length() {
    return await this.repository.length();
  }

  async all() {
    try {
      return await this.repository.all();
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }
}

export default new GameService(Move, gameRepository);
