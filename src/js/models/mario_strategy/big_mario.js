import consts from "../../etcs/consts";
import vars from "../../etcs/vars";

export default class {
  constructor(y) {
    this.h = 32;
    this.defaultSpriteNum = 0;
    this.r = 14;
    this.counter = 0;
    this.defaultY = y;
  }

  changeAnime(mario) {
    if (this.counter < 30) {
      this.counter++;
      if ((this.counter >> 2) % 2 === 0) {
        this.defaultSpriteNum = 32;
        this.h = 16;
        mario.y = this.defaultY + (consts.BLOCK_SIZE << 4);
      }
      else {
        this.defaultSpriteNum = 0;
        this.h = 32;
        mario.y = this.defaultY;
      }
      return true;
    }
    return false;
  }

  checkFloor(mario) {
    let lx = (mario.x) >> 4;
    let ty = (mario.y) >> 4;
    let by = ty + 32;

    return vars.field.isBlock(lx + 1, by) || vars.field.isBlock(lx + 14, by);
  }

  checkWall(mario, x) {
    let px = (mario.x >> 4) + (mario.vx >> 4) + x;
    let ty = (mario.y >> 4) + (mario.vy >> 4) + 5;
    let cy = (mario.y >> 4) + (mario.vy >> 4) + 16;
    let by = (mario.y >> 4) + (mario.vy >> 4) + 28;
    return vars.field.isBlock(px, ty) || vars.field.isBlock(px, cy) ||vars.field.isBlock(px, by);
  }
}