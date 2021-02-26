import vars from "../../etcs/vars";

// プルプルするブロック
export default class {
  constructor() {
    this.spriteNum = 372;
    this.counter = 0;
    this.animeY = 0;
  }

  checkMarioCeilCollision(block) {
    // アニメ開始
    vars.field.map[block.mapNum] = -1;
    this.animeY = (this.counter >> 2) % 3;
    this.counter = 1;
  }

  update(block) {
    // カウンターが0より大きい時だけアニメーションさせる
    if (this.counter > 0) {
      // アニメーション
      this.animeY = (this.counter >> 2) % 3;
      this.counter++;
      // アニメーションが終わったら元に戻す
      if (this.counter > 30) {
        vars.field.map[block.mapNum] = this.spriteNum;
        this.counter = 0;
      }
    }
  }

  draw(block) {
    if (this.counter > 0) { vars.field.drawObject(this.spriteNum, block.mapNum, 0, -this.animeY); }
  }
}