import consts from "../etcs/consts";
import functions from "../etcs/functions";
import vars from "../etcs/vars";
import Coin from "./coin";

export default class {
  constructor(spriteNum, mapNum) {
    this.spriteNum = spriteNum;
    this.mapNum = mapNum;
    this.kill = false;
  }

  checkMarioCeilCollision(mapNum) {
    if (mapNum === this.mapNum) {
      let coinX = functions.mapNumToX(mapNum) << 4;
      let coinY = (functions.mapNumToY(mapNum) - consts.BLOCK_SIZE) << 4;
      vars.field.coins.push(new Coin(coinX, coinY));
      vars.field.map[mapNum] = 373;
      this.kill = true;
    }
  }
}