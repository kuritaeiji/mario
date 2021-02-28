import vars from '../../etcs/vars';
import DeadNokonoko from './dead_nokonoko';

export default class {
  constructor() {
    this.h = 32;
    this.defaultSpriteNum = 162;
    this.xSpeed = 10;
    this.counter = 0;
  }

  checkMario(noko) {
    if (this.isTopMario(noko)) {
      noko.nokonokoType = new DeadNokonoko();
      noko.vx = 0;
      vars.field.mario.stepOnNokonoko();
      return; // 他当たり判定は行わずreturn
    }
    if ((this.isLeftMario(noko) || this.isRightMario(noko) || this.isBottomMario(noko)) && !vars.field.mario.mutekiCounter) { 
      vars.field.mario.addDamage();
    }
  }

  // 自分の頭上にマリオがいるか
  isTopMario(noko) {
    let marioX = vars.field.mario.x >> 4;
    let xFlag = (noko.x >> 4) - 15 < marioX && marioX < (noko.x >> 4) + 15;
    let marioFootY = (vars.field.mario.y >> 4) + vars.field.mario.marioType.h;
    let yFlag = (noko.y >> 4) < marioFootY && marioFootY < (noko.y >> 4) + 8;
    return xFlag && yFlag;
  }

  isLeftMario(noko) {
    let marioX = vars.field.mario.x >> 4;
    let xFlag = (noko.x >> 4) - 13 < marioX && marioX < (noko.x >> 4);
    let marioY = vars.field.mario.y >> 4;
    let enemyCenterY = (noko.y >> 4) + this.h / 2;
    let yFlag = enemyCenterY - (vars.field.mario.marioType.h -2) < marioY && marioY < enemyCenterY + (vars.field.mario.marioType.h - 2);
    return xFlag && yFlag;
  }

  isBottomMario(noko) {
    let marioX = vars.field.mario.x >> 4;
    let enemyCenterX = (noko.x >> 4) + 7;
    let xFlag = enemyCenterX - 15 < marioX && marioX < enemyCenterX;
    let marioY = vars.field.mario.y >> 4;
    let enemyBottomY = (noko.y >> 4) + this.h - 1;
    let yFlag = enemyBottomY - 5 < marioY && marioY < enemyBottomY;
    return xFlag && yFlag;
  }

  isRightMario(noko) {
    let marioX = vars.field.mario.x >> 4;
    let enemyX = (noko.x >> 4) + 15;
    let xFlag = enemyX - 13 < marioX && marioX < enemyX;
    let marioY = vars.field.mario.y >> 4;
    let enemyCenterY = (noko.y >> 4) + this.h / 2;
    let yFlag = enemyCenterY - (vars.field.mario.marioType.h -2) < marioY && marioY < enemyCenterY + (vars.field.mario.marioType.h - 2);
    return xFlag && yFlag;
  }

  descideSpriteNum(noko) {
    if (noko.vx < 0) { noko.spriteNum = this.defaultSpriteNum + (this.counter >> 4) % 2; }
    if (noko.vx > 0) { noko.spriteNum = this.defaultSpriteNum + (this.counter >> 4) % 2 -32;}
  }
}