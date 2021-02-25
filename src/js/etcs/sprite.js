import spriteImage from '../../images/sprite.png';
import consts from './consts';
const image = new Image();
image.src = spriteImage;

export default function (spriteNum, x, y, h = 16) {
  let sx = (spriteNum % 16) * 16;
  let sy = (spriteNum >> 4 ) * 16;

  let px = x >> 4;
  let py = y >> 4;
  consts.vcon.drawImage(image, sx, sy, 16, h, px, py, 16, h);
}

// spriteNum 0, 1, 2, 3, 4...