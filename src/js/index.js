import '../css/index.css';
import consts from './etcs/consts';
import vars from './etcs/vars';
import Mario from './models/mario';

let startTime;
let frameCount = 0;

let mario = new Mario();

function gameLoop() {
  let nowTime = performance.now();
  let nowFrame = (nowTime - startTime) / consts.GAME_SPPED;
  if (nowFrame - frameCount > 1) {
    frameCount++;
    // 更新処理
    mario.update();
    // 描画処理
    consts.vcon.fillStyle = '#66aaff';
    consts.vcon.fillRect(0, 0, consts.CANVAS_W, consts.CANVAS_H);

    // vconに描画
    mario.draw();

    consts.con.drawImage(consts.vcan, 0, 0, consts.SCREEN_W, consts.SCREEN_H, 0, 0, consts.CANVAS_W, consts.CANVAS_H);
  }
  requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
  vars.keys[e.code] = true;
});

document.addEventListener('keyup', (e) => {
  vars.keys[e.code] = false;
});

window.addEventListener('load', () => {
  startTime = performance.now();
  gameLoop();
});