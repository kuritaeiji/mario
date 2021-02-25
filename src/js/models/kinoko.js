import consts from '../etcs/consts';
import drawSprite from '../etcs/sprite';
import vars from '../etcs/vars';
import BigMario from './mario_strategy/big_mario';

export default class {
  constructor(x, y) {
    this.spriteNum = 234;
    this.x = x;
    this.y = y; //ビットシフトした値
    this.counter = 0;
    this.vx = 10;
    this.vy = 0;
    this.kill = false;
    this.r = 8;
  }

  update(mario) {
    // キノコが上に上がるアニメーション
    if (this.counter <= 15) {
      this.y -= (1 << 4);
    }

    // キノコが自由に動く
    if (this.counter > 15) {
      // 当たり判定
      this.checkFloor();
      this.checkWall();
      this.checkOuterScreen();

      // 移動
      this.x += this.vx;
      this.y += this.vy;
    }

    // マリオとの当たり判定
    this.checkMario(mario);

    if (this.counter <= 16) { this.counter++; }
  }

  draw() {
    drawSprite(this.spriteNum, this.x, this.y, this.counter - 1);
  }

  checkFloor() {
    let by = (this.y >> 4) + 16;
    let lx = (this.x >> 4) + 2;
    let rx = (this.x >> 4) + 13;
    if (vars.field.isBlock(lx, by) || vars.field.isBlock(rx, by)) {
      // yの位置をブロックの上にする
      let currentRowNum = (this.y >> 4) >> 4;
      this.y = currentRowNum  * consts.BLOCK_SIZE << 4;
      // 重力を0にする
      this.vy = 0;
    } else {
      // 重力発生
      this.vy += 2;
    }
  }

  checkWall() {
    let rx = (this.x >> 4) + 16;
    let lx = (this.x >> 4);
    let y = (this.y >> 4) + 7;
    // 右側が壁の時、左に移動させる
    if (vars.field.isBlock(rx, y)) { this.vx = -10; }
    if (vars.field.isBlock(lx, y)) { this.vx = 10; }
  }

  checkOuterScreen() {
    if (this.x < vars.field.camera.x << 4) { this.kill = true; }
  }

  checkMario(mario) {
    let dx = (this.x >> 4) - (mario.x >> 4);
    let dy = (this.y >> 4) - (mario.y >> 4);
    if (Math.pow(this.r, 2) + Math.pow(mario.marioType.r, 2) > Math.pow(dx, 2) + Math.pow(dy, 2)) {
      mario.y -= consts.BLOCK_SIZE << 4;
      mario.marioType = new BigMario(mario.y);
      this.kill = true;
    }
  }
}