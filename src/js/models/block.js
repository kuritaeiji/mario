export default class {
  constructor(mapNum, blockType) {
    this.mapNum = mapNum;
    this.blockType = blockType;
    this.kill = false;
  }

  checkMarioCeilCollision(mapNum) {
    if (this.mapNum === mapNum) { this.blockType.checkMarioCeilCollision(this); }
  }

  update() {
    this.blockType.update(this);
  }

  draw() {
    this.blockType.draw(this);
  }
}