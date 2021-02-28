import vars from '../../etcs/vars';

export default class {
  constructor() {
    this.h = 16;
    this.defaultSpriteNum = 149;
    this.xSpeed = 30;
    this.counter = 0;
    this.isMove = false;
  }

  checkMario(noko) {
    const mario = vars.field.mario;
    if (this.isLeftTopMario(noko, mario)) {
      this.counter = 0;
      if (this.isMove) {
        noko.vx = 0;
        mario.stepOnNokonoko();
        this.isMove = false;
      } else {
        noko.vx = this.xSpeed;
        mario.stepOnNokonoko();
        this.isMove = true;
      }
    }
    if (this.isRightTopMario(noko, mario)) {
      this.counter = 0;
      if (this.isMove) {
        noko.vx = 0;
        mario.stepOnNokonoko();
        this.isMove = false;
      } else {
        noko.vx = -this.xSpeed;
        mario.stepOnNokonoko();
        this.isMove = true;
      }
    }
    if (this.isLeftMario(noko, mario)) {
      this.counter = 0;
      if (this.isMove && !mario.mutekiCounter) {
        mario.addDamage();
      } else {
        noko.vx = this.xSpeed;
        this.isMove = true;
      }
    }
    if (this.isRightMario(noko, mario)) {
      this.counter = 0;
      if (this.isMove && !mario.mutekiCounter) {
        mario.addDamage();
      } else {
        noko.vx = -this.xSpeed;
        this.isMove = true;
      }
    }
  }

  descideSpriteNum(noko) {
    noko.spriteNum = this.defaultSpriteNum;
  }

  isLeftTopMario(noko, mario) {
    let marioFootY = (mario.y >> 4) + mario.marioType.h;
    let y = noko.y >> 4;
    let yFlag = y < marioFootY && marioFootY < y + 6;
    let marioX = (mario.x >> 4);
    let x = noko.x >> 4;
    let xFlag = x - 14 < marioX && marioX <= x;
    return xFlag && yFlag;
  }

  isRightTopMario(noko, mario) {
    let marioFootY = (mario.y >> 4) + mario.marioType.h;
    let y = noko.y >> 4;
    let yFlag = y < marioFootY && marioFootY < y + 6;
    let marioX = (mario.x >> 4);
    let x = noko.x >> 4;
    let xFlag = x < marioX && marioX < x + 14;
    return xFlag && yFlag;
  }

  isLeftMario(noko, mario) {
    let marioX = mario.x >> 4;
    let x = noko.x >> 4;
    let xFlag = x - 14 < marioX && marioX <= x;
    let marioFootY = (mario.y >> 4) + mario.marioType.h;
    let y = noko.y >> 4;
    let yFlag = y + 5 < marioFootY && marioFootY < y + 17;
    return xFlag && yFlag;
  }

  isRightMario(noko, mario) {
    let marioX = (mario.x >> 4);
    let x = noko.x >> 4;
    let xFlag = x < marioX && marioX < x + 14;
    let marioFootY = (mario.y >> 4) + mario.marioType.h;
    let y = noko.y >> 4;
    let yFlag = y + 5 < marioFootY && marioFootY < y + 17;
    return xFlag && yFlag;
  }
}