import '../css/index.css';
import consts from './etcs/consts';
import vars from './etcs/vars';

let startTime;
let frameCount = 0;

function gameLoop() {
  let nowTime = performance.now();
  let nowFrame = (nowTime - startTime) / consts.GAME_SPPED;
  if (nowFrame - frameCount > 1) {
    frameCount++;
    // 更新処理
    vars.field.update();
    // 描画処理
    consts.vcon.fillStyle = '#66aaff';
    consts.vcon.fillRect(vars.field.camera.x, vars.field.camera.y, consts.SCREEN_W, consts.SCREEN_H);

    // vconに描画
    vars.field.draw();

    consts.con.drawImage(consts.vcan, vars.field.camera.x, vars.field.camera.y, consts.SCREEN_W, consts.SCREEN_H, 0, 0, consts.CANVAS_W, consts.CANVAS_H);
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