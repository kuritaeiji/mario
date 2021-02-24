import vars from "../../etcs/vars";

export default class {
  checkFloor(mario) {
    let lx = (mario.x) >> 4;
    let ty = (mario.y) >> 4;
    let by = ty + 32;

    return vars.field.isBlock(lx + 1, by) || vars.field.isBlock(lx + 14, by);
  }
}