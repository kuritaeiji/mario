import drawSprite from '../etcs/sprite';

export default class {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vy = -30;
    this.defaultSpriteNum = 384;
    this.spriteNum = 384;
    this.counter = 0;
    this.kill = false;
  }

  update() {
    this.y += this.vy;
    this.spriteNum = this.defaultSpriteNum + (this.counter >> 2) % 3;
    if (this.counter > 15) { this.kill = true; }
    this.counter++;
  }

  draw() {
    drawSprite(this.spriteNum, this.x, this.y);
  }
}