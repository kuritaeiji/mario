import consts from '../etcs/consts';
import drawSprite from '../etcs/sprite';
import vars from '../etcs/vars';
import AliveNokonoko from './nokonoko_starategy/alive_nokonoko';

export default class {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = - 10;
    this.vy = 0;
    this.spriteNum = 162;
    this.kill = false;
    this.nokonokoType = new AliveNokonoko();
  }

  update() {
    // 当たり判定
    this.checkOuterScreen();
    if (this.nokonokoType.counter > 15) {
      this.nokonokoType.checkMario(this);
    }
    this.checkFloor();
    this.checkWall();

    // 移動
    this.x += this.vx;
    this.y += this.vy;

    // アニメーション
    this.nokonokoType.counter++;
    this.nokonokoType.descideSpriteNum(this);
  }

  draw() {
    drawSprite(this.spriteNum, this.x, this.y, this.nokonokoType.h);
  }

  checkOuterScreen() {
    if (vars.field.camera.x > this.x + (consts.BLOCK_SIZE << 4)) { this.kill = true; }
  }

  checkFloor() {
    let lx = (this.x >> 4) + 3;
    let rx = (this.x >> 4) + 12;
    let by = (this.y >> 4) + this.nokonokoType.h;
    if (vars.field.isBlock(lx, by) || vars.field.isBlock(rx, by)) {
      let currentRowNum = this.y >> 4 >> 4;
      this.y = currentRowNum * consts.BLOCK_SIZE << 4;
      this.vy = 0;
    } else {
      // 重力発生
      this.vy += 5;
    }
  }

  checkWall() {
    let lx = (this.x >> 4);
    let rx = (this.x >> 4) + 15;
    let y = (this.y >> 4) + this.nokonokoType.h / 2;
    // 左の壁
    if (vars.field.isBlock(lx, y)) { this.vx = this.nokonokoType.xSpeed; }
    // 右の壁
    if (vars.field.isBlock(rx, y)) { this.vx = - this.nokonokoType.xSpeed; }
  }
}