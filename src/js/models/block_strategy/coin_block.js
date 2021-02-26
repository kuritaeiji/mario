import vars from '../../etcs/vars';
import consts from '../../etcs/consts';
import functions from '../../etcs/functions';
import Coin from '../coin';

export default class {
  checkMarioCeilCollision(block) {
    let coinX = functions.mapNumToX(block.mapNum) << 4;
    let coinY = (functions.mapNumToY(block.mapNum) - consts.BLOCK_SIZE) << 4;
    vars.field.coins.push(new Coin(coinX, coinY));
    vars.field.map[block.mapNum] = 373;
    this.kill = true;
  }

  update() {}
  draw() {}
}