import drawSprite from '../etcs/sprite';
import vars from '../etcs/vars';


// actionStatus
const Stand = 0;
const Run = 1;

// direction
const Left = 0;
const Right = 1;

export default class {
  constructor() {
    this.x = 100 << 4;
    this.y = 100 << 4;
    this.vx = 0;
    this.vy = 0;
    this.defaultSpriteNum = 32;
    this.spriteNum = 32;

    this.actionStatus = 0;
    this.dirction = Right;

    this.animeCount = 0;
    this.animeFrame = 2; // ビット

    this.isBig = false;
  }

  update() {
    if (vars.keys.ArrowLeft) {
      if (-40 < this.vx) { this.vx -= 1; }
    } else if (vars.keys.ArrowRight) {
      if (this.vx < 40) { this.vx += 1; }
    } else {
      if (this.vx < 0) { this.vx += 1; }
      if (this.vx > 0) { this.vx -= 1; }
    }

    if (this.vx === 0) {
      this.direction = Right;
      this.actionStatus = Stand;
    } else {
      if (this.vx > 0) {
        this.actionStatus = Run;
        this.direction = Right;
      }
      if (this.vx < 0) {
        this.actionStatus = Run;
        this.direction = Left;
      }
    }

    if (this.actionStatus === Run) {
      this.spriteNum = this.defaultSpriteNum + ((this.animeCount >> this.animeFrame) % 3) + 2;
      this.animeCount++;
    } else {
      this.spriteNum = this.defaultSpriteNum;
    }

    if (this.direction === Left) {
      this.spriteNum += 48;
    }

    this.x += this.vx;
    this.y += this.vy;
  }

  draw() {
    drawSprite(this.spriteNum, this.x, this.y, this.isBig);
  }
}

// 2, 3, 4, 2, 3, 4...