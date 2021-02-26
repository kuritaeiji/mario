import vars from '../../etcs/vars';
import functions from '../../etcs/functions';
import Kinoko from '../kinoko';

export default class {
  checkMarioCeilCollision(block) {
    vars.field.map[block.mapNum] = 373;
    block.kill = true;
    // キノコ出す
    let x = functions.mapNumToX(block.mapNum) << 4;
    let y = functions.mapNumToY(block.mapNum) << 4;
    vars.field.kinoko = new Kinoko(x, y);
  }

  update() {}
  draw() {}
}