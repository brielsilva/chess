export default class Move {
  constructor({ position, type, color, attacked }) {
    this.position = position;
    this.type = type;
    this.color = color;
    this.attacked = attacked;
  }
}
