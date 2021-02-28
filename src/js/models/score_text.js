import consts from "../etcs/consts";

export default class {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.counter = 0;
    this.kill = false;
  }

  update() {
    if (this.counter > 60) { this.kill = true; }
    this.counter++;
  }

  draw() {
    consts.con.font = '15px "Inpact"';
    consts.con.fillStyle = 'white';
    consts.con.fillText('100', this.x, this.y);
  }
}