const consts1 = {
  CANVAS_W: 576,
  CANVAS_H: 512,

  FIELD_COL: 222,
  FIELD_ROW: 16,

  SCREEN_COL: 18,
  SCREEN_ROW: 16,

  GAME_SPPED: 1000 / 60,

  BLOCK_SIZE: 16,

  can: document.getElementById('can'),
  vcan: document.createElement('canvas')
};

const consts2 = {
  SCREEN_W: consts1.SCREEN_COL * 16,
  SCREEN_H: consts1.SCREEN_ROW * 16,

  FIELD_W: consts1.FIELD_COL * 16,
  FIELD_H: consts1.FIELD_ROW * 16,

  con: consts1.can.getContext('2d'),
  vcon: consts1.vcan.getContext('2d')
};

consts1.can.width = consts1.CANVAS_W;
consts1.can.height = consts1.CANVAS_H;

consts1.vcan.width = consts2.FIELD_W;
consts1.vcan.height = consts2.FIELD_H;

consts2.con.mozimageSmoothingEnabled    = false;
consts2.con.msimageSmoothingEnabled     = false;
consts2.con.webkitimageSmoothingEnabled = false;
consts2.con.imageSmoothingEnabled       = false;

export default Object.assign(consts1, consts2);