import '../css/index.css';
import consts from './etcs/consts';
import functions from './etcs/functions';
import vars from './etcs/vars';
import Field from './models/field';

let startTime;
let gameStartTime = performance.now();
let frameCount = 0;
let time = 0;

function gameLoop() {
  let nowTime = performance.now();
  let nowFrame = (nowTime - startTime) / consts.GAME_SPPED;
  if (nowFrame - frameCount > 1) {
    frameCount++;
    if (!vars.gameOver) {
      // 更新処理
      vars.field.update();
      // 描画処理
      consts.vcon.fillStyle = '#66aaff';
      consts.vcon.fillRect(vars.field.camera.x, vars.field.camera.y, consts.SCREEN_W, consts.SCREEN_H);

      // vconに描画
      vars.field.draw();

      consts.con.drawImage(consts.vcan, vars.field.camera.x, vars.field.camera.y, consts.SCREEN_W, consts.SCREEN_H, 0, 0, consts.CANVAS_W, consts.CANVAS_H);
      vars.field.scoreTexts.forEach((t) => { t.draw(); });
      consts.con.font = '20px "Inpact"';
      consts.con.fillStyle = 'white';
      consts.con.fillText('Score: ' + vars.field.score, 10, 20);
      if (!vars.field.mario.marioType.gameOver) {
        time = Math.floor((nowTime - gameStartTime) / 1000);
      }
      consts.con.fillText('Time: ' + time, 10, 45);
    } else {
      consts.con.fillStyle = 'black';
      consts.con.fillRect(0, 0, consts.CANVAS_W, consts.CANVAS_H);
      functions.drawText('Game Over', -10);
      functions.drawText('Press R to Retry', 20);
    }
  }
  requestAnimationFrame(gameLoop);
}

function gameRestart() {
  vars.field = new Field();
  vars.gameOver = false;
}

document.addEventListener('keydown', (e) => {
  vars.keys[e.code] = true;
  if (e.code === 'KeyR') {
    gameStartTime = performance.now();
    time = 0;
    gameRestart();
  }
});

document.addEventListener('keyup', (e) => {
  vars.keys[e.code] = false;
});

window.addEventListener('load', () => {
  startTime = performance.now();
  gameLoop();
});