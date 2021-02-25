import functions from "../etcs/functions";
import vars from "../etcs/vars";
import Kinoko from "./kinoko";

export default class {
  constructor(mapNum) {
    this.spriteNum = 234;
    this.mapNum = mapNum;
    this.kill = false;
  }

  checkMarioCeilCollision(mapNum) {
    // マップナンバーが一致していたらキノコ出す。
    if (mapNum === this.mapNum) {
      // アイテムブロックをただのブロックにする
      vars.field.map[this.mapNum] = 373;
      this.kill = true;
      // キノコ出す
      let x = functions.mapNumToX(mapNum) << 4;
      let y = functions.mapNumToY(mapNum) << 4;
      vars.field.kinoko = new Kinoko(x, y);
    }
  }
}