import vars from "../../etcs/vars";
import consts from '../../etcs/consts';

export default class {
  constructor(y, counter = 0) {
    this.h = 16;
    this.defaultSpriteNum = 32;
    this.r = 8;
    this.counter = counter;
    this.defaultY = y;
    this.gameOver = false;
    this.gameOverCounter = 0;
  }

  // デカからチビになるアニメーション
  changeAnime(mario) {
    if (this.counter < 30) {
      this.counter++;
      if ((this.counter >> 2) % 2 === 0) {
        this.defaultSpriteNum = 0;
        this.h = 32;
        mario.y = this.defaultY;
      }
      else {
        this.defaultSpriteNum = 32;
        this.h = 16;
        mario.y = this.defaultY + (consts.BLOCK_SIZE << 4);
      }
      return true;
    }
    return false;
  }

  checkFloor(mario) {
    let lx = mario.x >> 4;
    let ty = mario.y >> 4;
    let by = ty + 16;
    return vars.field.isBlock(lx + 3, by) || vars.field.isBlock(lx + 13, by);
  }

  checkWall(mario, x) {
    // 左の壁の場合はxが0、右の壁の場合はxが16
    let px = (mario.x >> 4) + (mario.vx >> 4) + x;
    let ty = (mario.y >> 4) + (mario.vy >> 4) + 3;
    let by = (mario.y >> 4) + (mario.vy >> 4) + 12;
    return vars.field.isBlock(px, ty) || vars.field.isBlock(px, by);
  }

  gameOverAnimation(mario) {
    this.gameOverCounter++;
    mario.spriteNum = 46;
    if (this.gameOverCounter > 30 && this.gameOverCounter < 60) { mario.y -= 50; }
    if (this.gameOverCounter >= 60) { mario.y += 50; }
    if (this.gameOverCounter > 180) { vars.gameOver = true; }
  }

  addDamage() {
    this.gameOver = true;
  }
}