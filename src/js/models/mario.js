import drawSprite from '../etcs/sprite';
import vars from '../etcs/vars';


// animeStatus
const Stand = 0;
const Walk  = 1;
const Run   = 2;
const Jump  = 3;

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
    this.isJump = false;
    this.jumpCount = 0;
  }

  update() {
    this.animeCount++;

    this.walkOrRun();
    this.jump();
    this.decideAnimeStatus();
    this.decideSpriteNum();

    this.x += this.vx;
    this.y += this.vy;
  }

  draw() {
    drawSprite(this.spriteNum, this.x, this.y, this.isBig);
  }

  walkOrRun() {
    if (vars.keys.ArrowLeft) {
      if (vars.keys.ShiftLeft && -30 < this.vx) { this.vx -= 2; } // 走り
      else if (-15 < this.vx) { this.vx -= 1; }                   // 歩き
    } else if (vars.keys.ArrowRight) {
      if (vars.keys.ShiftLeft && 30 > this.vx) { this.vx += 2; }
      else if (this.vx < 15) { this.vx += 1; }
    } else {
      if (this.vx < 0) { this.vx += 1; }
      if (this.vx > 0) { this.vx -= 1; }
    }
  }

  jump() {
    // スペースキーを押し続けるとカウントをふやし、かうんとが10まで初速を与え続け大ジャンプ
    // スペースキーを押したかつジャンプしていない時、初速を与える
    if(vars.keys.Space) {
      this.jumpCount++;
      if (this.isJump && this.jumpCount < 20) {
        this.vy = -60 + this.jumpCount;
      }
      if (!this.isJump) {
        this.vy = -60;
        this.isJump = true;
      }
    }

    // ジャンプ中は重力を発生させる
    // 大ジャンプの最初の方だけ重力を小さくする
    if (this.isJump) {
      this.vy += 6;
    }

    // 床にいる
    if (this.y > 100 << 4) {
      this.vy = 0;
      this.y  = 100 << 4;
      this.isJump = false;
      this.jumpCount = 0;
    }
  }

  decideAnimeStatus() {
    // x方向の速度で立っているか歩いているか走っているか。isJumpがtrueなら問答無用でJumpにする
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
        if (this.vx >= -15) { this.animeStatus = Walk; }
        if (this.vx < -15) { this.animeStatus = Run; }
      }
    }
    if (this.isJump) { this.animeStatus = Jump; }
  }

  decideSpriteNum() {
    // スプライトナンバーの決定
    if (this.animeStatus === Run) {
      this.spriteNum = this.defaultSpriteNum + (this.animeCount >> this.animeFrame) % 3 + 2;
    } else if (this.animeStatus === Walk) {
      this.spriteNum = this.defaultSpriteNum + (this.animeCount >> (this.animeFrame + 1)) % 3+ 2;
    } else if (this.animeStatus === Jump) {
      this.spriteNum = this.defaultSpriteNum + 6;
    } else {
      this.spriteNum = this.defaultSpriteNum;
    }

    if (this.direction === Left) {
      this.spriteNum += 48;
    }
  }
}

// 2, 3, 4, 2, 3, 4...