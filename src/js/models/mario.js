import drawSprite from '../etcs/sprite';
import vars from '../etcs/vars';


// animeStatus
const Stand = 0;
const Walk  = 1;
const Run   = 2;

// direction
const Left  = 0;
const Right = 1;

export default class {
  constructor() {
    this.x = 100 << 4;
    this.y = 100 << 4;
    this.vx = 0;
    this.vy = 0;
    this.defaultSpriteNum = 32;
    this.spriteNum = 32;

    this.animeStatus = 0;
    this.dirction = Right;

    this.animeCount = 0;
    this.animeFrame = 2; // ビット

    this.isBig = false;
  }

  update() {
    this.animeCount++;

    if (vars.keys.ArrowLeft) {
      if (vars.keys.ShiftLeft && -30 < this.vx) { this.vx -= 2; } // 走り
      else if (-15 < this.vx) { this.vx -= 1; }                  // 歩き
    } else if (vars.keys.ArrowRight) {
      if (vars.keys.ShiftLeft && 30 > this.vx) { this.vx += 2; }
      else if (this.vx < 15) { this.vx += 1; }
    } else {
      if (this.vx < 0) { this.vx += 1; }
      if (this.vx > 0) { this.vx -= 1; }
    }

    // まずy方向の速度でジャンプしているか判定し、その後x方向の速度で立っているか歩いているか走っているか
    if (this.vx === 0) {
      this.direction = Right;
      this.animeStatus = Stand;
    } else {
      if (this.vx > 0) {
        this.direction = Right;
        if (this.vx > 15) { this.animeStatus = Run; }
        if (this.vx <= 15) { this.animeStatus = Walk; }
      }
      if (this.vx < 0) {
        this.direction = Left;
        if (this.vx >= 15) { this.animeStatus = Walk; }
        if (this.vx < 15) { this.animeStatus = Run; }
      }
    }

    if (this.animeStatus === Run) {
      this.spriteNum = this.defaultSpriteNum + (this.animeCount >> this.animeFrame) % 3 + 2;
    } else if (this.animeStatus === Walk) {
      this.spriteNum = this.defaultSpriteNum + (this.animeCount >> (this.animeFrame + 1)) % 3+ 2;
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