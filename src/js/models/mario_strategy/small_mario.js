import vars from "../../etcs/vars";

export default class {
  checkFloor(mario) {
    let lx = (mario.x) >> 4;
    let ty = (mario.y) >> 4;
    let by = ty + 16;
    return vars.field.isBlock(lx + 3, by) || vars.field.isBlock(lx + 13, by);
  }
}