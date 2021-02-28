import consts from "./consts";

export default {
  // ビットシフトされてない座標を返す
  mapNumToX: function (mapNum) {
    return mapNum % consts.FIELD_COL * consts.BLOCK_SIZE;
  },
  mapNumToY: function (mapNum) {
    return Math.floor(mapNum / consts.FIELD_COL) * consts.BLOCK_SIZE;
  },
  // 真ん中に文字
  drawText: function (text, yFromCenter) {
    consts.con.font = '20px "Inpact"';
    consts.con.fillStyle = 'white';
    let w = consts.con.measureText(text).width;
    let x = consts.CANVAS_W / 2 - w / 2;
    let y = consts.CANVAS_H / 2 + yFromCenter;
    consts.con.fillText(text, x, y);
  }
};