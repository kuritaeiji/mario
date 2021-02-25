import vars from "../../etcs/vars";

export default class {
  constructor() {
    this.h = 16;
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
}