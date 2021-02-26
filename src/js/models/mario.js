import consts from '../etcs/consts';
import drawSprite from '../etcs/sprite';
import vars from '../etcs/vars';
import SmallMario from './mario_strategy/small_mario';

// animeStatus
const Stand = 0;
const Walk  = 1;
const Run   = 2;
const Jump  = 3;

// direction
const Left  = 0;
const Right = 1;

const GRAVITY = 6;
const JumpCoolTime = 10;

export default class {
  constructor() {
    this.x = consts.SCREEN_W / 3 << 4;
    this.y = (consts.SCREEN_ROW - 3) * 16 << 4;
    this.vx = 0;
    this.vy = 0;
    this.spriteNum = 32;

    this.animeStatus = 0;
    this.dirction = Right;

    this.animeCount = 0;
    this.animeFrame = 2; // ビット

    this.isJump = false;
    this.jumpCount = 20;
    this.jumpCoolCounter = 0;

    this.marioType = new SmallMario(100);
  }

  update() {
    // マリオが大きくなるもしくは小さくなるアニメ中はアップデートしない
    if (!this.marioType.changeAnime(this)) {
      this.animeCount++;
      this.jumpCoolCounter++;

      // 移動
      this.walkOrRun();
      if (this.jumpCoolCounter > JumpCoolTime) {
        this.jump();
      }

      // 当たり判定
      this.checkFloor();
      this.checkWall();
      this.checkCeil();

      this.decideAnimeStatus();
      this.decideSpriteNum();

      this.x += this.vx;
      this.y += this.vy;
    } else {
      // アニメーション中はスプライトナンバーを変える
      this.decideSpriteNum();
    }
  }

  draw() {
    drawSprite(this.spriteNum, this.x, this.y, this.marioType.h);
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
        this.vy = -70 + this.jumpCount;
      }
      if (!this.isJump) {
        this.vy = -70;
        this.isJump = true;
      }
    }

    // ジャンプ中は重力を発生させる
    // 大ジャンプの最初の方だけ重力を小さくする
    if (this.isJump) {
      this.vy += GRAVITY;
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
      this.spriteNum = this.marioType.defaultSpriteNum + (this.animeCount >> this.animeFrame) % 3 + 2;
    } else if (this.animeStatus === Walk) {
      this.spriteNum = this.marioType.defaultSpriteNum + (this.animeCount >> (this.animeFrame + 1)) % 3+ 2;
    } else if (this.animeStatus === Jump) {
      this.spriteNum = this.marioType.defaultSpriteNum + 6;
    } else {
      this.spriteNum = this.marioType.defaultSpriteNum;
    }

    if (this.direction === Left) {
      this.spriteNum += 48;
    }
  }

  checkFloor() {
    // 上に行こうとするときはreturn
    if (this.vy < 0) { return; }
    if (this.marioType.checkFloor(this)) {
      // yの速度を0にする
      this.vy = 0;
      // yの位置をブロッックの上にする
      let currentRowNum = (this.y >> 4) >> 4;
      this.y = currentRowNum  * consts.BLOCK_SIZE << 4;
      // ジャンプ中ならジャンプをやめさせる
      if (this.isJump) {
        this.isJump = false;
        this.jumpCoolCounter = 0;
        this.jumpCount = 0;
      }
    } else {
      if (!this.isJump) { this.vy += GRAVITY; } // ジャンプ中でないなら重力追加
    }
  }

  checkWall() {
    // 横に移動しないならreturn
    if (this.vx === 0) { return; }
    // 壁に当たった場合、vxだけxの位置をマイナス あとでvxをxにプラスするので実質動かない アニメーションをvxで評価する為安易にvx=0に出来ない
    if (this.marioType.checkWall(this, 0) || this.marioType.checkWall(this, 16)) { this.x -= this.vx; }
  }

  checkCeil() {
    // 上に移動していないならreturn
    if (this.vy >= 0) { return; }
    let px = (this.x >> 4) + (this.vx >> 4) + 8;
    let py = (this.y >> 4) + (this.vy >> 4);
    let mapNum = vars.field.isBlock(px, py);
    // mapNumが帰ってくれば衝突
    if (mapNum) {
      // ジャンプカウントが20より小さいと大ジャンプと看做され、天井にぶつかってからも初速を与えられ続られ天応にぶつかり続ける為ジャンプカウントに20+
      this.jumpCount += 20;
      this.vy = GRAVITY;
      // // キノコブロックにどのマップナンバーにぶつかったか報告
      // vars.field.kinokoBlocks.forEach((b) => { b.checkMarioCeilCollision(mapNum); });
      // // コインブロックとぶつかったか報告
      // vars.field.coinBlocks.forEach((b) => { b.checkMarioCeilCollision(mapNum); });
      // ブロックに当たったブロックの位置を知らせる
      vars.field.blocks.forEach((b) => { b.checkMarioCeilCollision(mapNum); });
    }
  }
}