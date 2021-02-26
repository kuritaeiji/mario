import consts from "./consts";

export default {
  // ビットシフトされてない座標
  mapNumToX: function (mapNum) {
    return mapNum % consts.FIELD_COL * consts.BLOCK_SIZE;
  },
  mapNumToY: function (mapNum) {
    return Math.floor(mapNum / consts.FIELD_COL) * consts.BLOCK_SIZE;
  }
};