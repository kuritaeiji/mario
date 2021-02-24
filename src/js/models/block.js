import vars from "../etcs/vars";

export default class {
  constructor(mapNum) {
    this.mapNum = mapNum;
    this.spriteNum = vars.field.map[this.mapNum];
    this.animeY = 0; // ビットシフトしなくて良い
    this.counter = 0;
    this.kill = false;
    vars.field.map[this.mapNum] = -1;
  }

  update() {
    if (this.counter > 10) { 
      this.kill = true;
      vars.field.map[this.mapNum] = this.spriteNum;
    }
    this.animeY = this.counter % 3;
    this.counter++;
  }

  draw() {
    vars.field.drawObject(this.spriteNum, this.mapNum, 0, -this.animeY);
  }
}