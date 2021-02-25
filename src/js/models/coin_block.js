import vars from "../etcs/vars";

export default class {
  constructor(spriteNum, mapNum) {
    this.spriteNum = spriteNum;
    this.mapNum = mapNum;
    this.kill = false;
  }

  checkMarioCeilCollision(mapNum) {
    if (mapNum === this.mapNum) {
      vars.field.map[mapNum] = 373;
      this.kill = true;
    }
  }
}