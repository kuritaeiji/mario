import consts from "../etcs/consts";

export default class {
  constructor() {
    this.x = 0;
    this.y = 0;
  }

  update(mario) {
    if (mario.x >> 4 > this.x + consts.SCREEN_W / 3) { this.x = (mario.x >> 4) - consts.SCREEN_W / 3; }
  }
}