import consts from '../etcs/consts';
import drawSprite from '../etcs/sprite';
import vars from '../etcs/vars';

export default class {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = -10;
    this.vy = 0;
    this.defaultSpriteNum = 96;
    this.spriteNum = 96;
    this.state = 1; // 0: 死亡, 1: 生きてる
    this.kill = false;

    this.counter = 0;
    this.deadCounter = 0; // 死亡時に使うカウンター
  }

  update() {
    if (this.state) {
      // 当たり判定
      this.checkOuterScreen();
      this.checkMario();
      this.checkFloor();
      this.checkWall();

      // 移動
      this.x += this.vx;
      this.y += this.vy;

      // アニメーション
      this.counter++;
      this.spriteNum = this.defaultSpriteNum + (this.counter >> 4) % 2;
    } else {
      this.deadAnimeation();
    }
  }

  draw() {
    drawSprite(this.spriteNum, this.x, this.y);
  }

  checkOuterScreen() {
    if (vars.field.camera.x > this.x + (consts.BLOCK_SIZE << 4)) { this.kill = true; }
  }

  checkFloor() {
    let lx = (this.x >> 4) + 3;
    let rx = (this.x >> 4) + 12;
    let by = (this.y >> 4) + 16;
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
    let y = (this.y >> 4) + 7;
    // 左の壁
    if (vars.field.isBlock(lx, y)) { this.vx = 10; }
    // 右の壁
    if (vars.field.isBlock(rx, y)) { this.vx = -10; }
  }

  checkMario() {
    if (this.isTopMario()) { 
      this.state = 0;
      return;
    }
    if ((this.isLeftMario() || this.isRightMario() || this.isBottomMario()) && !vars.field.mario.mutekiCounter) { 
      vars.field.mario.addDamage();
    }
  }

  // 自分の頭上にマリオがいるか
  isTopMario() {
    let marioX = vars.field.mario.x >> 4;
    let xFlag = (this.x >> 4) - 13 < marioX && marioX < (this.x >> 4) + 13;
    let marioFootY = (vars.field.mario.y >> 4) + vars.field.mario.marioType.h;
    let yFlag = (this.y >> 4) < marioFootY && marioFootY < (this.y >> 4) + 8;
    return xFlag && yFlag;
  }

  isLeftMario() {
    let marioX = vars.field.mario.x >> 4;
    let xFlag = (this.x >> 4) - 13 < marioX && marioX < (this.x >> 4);
    let marioY = vars.field.mario.y >> 4;
    let enemyCenterY = (this.y >> 4) + 7;
    let yFlag = enemyCenterY - (vars.field.mario.marioType.h -2) < marioY && marioY < enemyCenterY + (vars.field.mario.marioType.h - 2);
    return xFlag && yFlag;
  }

  isBottomMario() {
    let marioX = vars.field.mario.x >> 4;
    let enemyCenterX = (this.x >> 4) + 7;
    let xFlag = enemyCenterX - 15 < marioX && marioX < enemyCenterX;
    let marioY = vars.field.mario.y >> 4;
    let enemyBottomY = (this.y >> 4) + 15;
    let yFlag = enemyBottomY - 5 < marioY && marioY < enemyBottomY;
    return xFlag && yFlag;
  }

  isRightMario() {
    let marioX = vars.field.mario.x >> 4;
    let enemyX = (this.x >> 4) + 15;
    let xFlag = enemyX - 13 < marioX && marioX < enemyX;
    let marioY = vars.field.mario.y >> 4;
    let enemyCenterY = (this.y >> 4) + 7;
    let yFlag = enemyCenterY - (vars.field.mario.marioType.h -2) < marioY && marioY < enemyCenterY + (vars.field.mario.marioType.h - 2);
    return xFlag && yFlag;
  }

  deadAnimeation() {
    if (this.deadCounter < 10) {
      this.spriteNum = this.defaultSpriteNum + 2;
      this.deadCounter++;
    } else { this.kill = true; }
  }
}