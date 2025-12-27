import type { GridPoint, Orientation, RectDef } from "../grid/types";

/**
 * 1枚のカード枠の中で、ボタンを置く場所
 */
export type ButtonSlot = "top" | "middle" | "bottom";

export const buttonFromPoints = (args: {
  orientation: Orientation;
  points: GridPoint[];

  // 列番号からX方向の中心を返す
  centerXOf: (col: number) => string;

  // 行番号からY方向の中心を返す
  centerYOf: (row: number) => string;

  // グリッドを1つ進んだときのY方向の増分
  stepY: string;

  // 向きからカード1枚分の高さを返す
  sizeByOrientation: (o: Orientation) => { w: string; h: string };

  // ボタン高さの比率
  heightRatio?: number;

  // ボタンを置く位置
  slot?: ButtonSlot;
}): RectDef => {
  const {
    orientation,
    points,
    centerXOf,
    centerYOf,
    stepY,
    sizeByOrientation,
    heightRatio = 0.25,
    slot = "top",
  } = args;

  // --------------------------------
  // points が空でも動くようにする
  // --------------------------------
  const safePoints: GridPoint[] =
    points.length === 0 ? [{ row: 0, col: 0 }] : points;

  // --------------------------------
  // 行・列の最小値と最大値を求める
  // --------------------------------
  const rows = safePoints.map((p) => p.row);
  const cols = safePoints.map((p) => p.col);

  const minRow = Math.min(...rows);
  const maxRow = Math.max(...rows);
  const minCol = Math.min(...cols);
  const maxCol = Math.max(...cols);

  // --------------------------------
  // X方向の中心（左右端の平均）
  // --------------------------------
  const centerX = `calc((${centerXOf(minCol)} + ${centerXOf(maxCol)}) / 2)`;

  // --------------------------------
  // Y方向の中心（上下端の平均）
  // --------------------------------
  const cardRectCenterY = `calc((${centerYOf(minRow)} + ${centerYOf(maxRow)}) / 2)`;

  // --------------------------------
  // カード1枚分の高さだけ取得
  // --------------------------------
  const { h: cardH } = sizeByOrientation(orientation);

  // --------------------------------
  // anchors の縦方向の広がりを反映した高さ
  // --------------------------------
  const rowSpan = maxRow - minRow;
  const cardRectH = `calc(${cardH} + (${stepY} * ${rowSpan}))`;

  // --------------------------------
  // ボタンの高さ
  // --------------------------------
  const buttonH = `calc(${cardH} * ${heightRatio})`;

  // --------------------------------
  // カード枠の上端
  // --------------------------------
  const cardRectTop = `calc(${cardRectCenterY} - (${cardRectH} / 2))`;

  // --------------------------------
  // slot に応じたボタン上端
  // --------------------------------
  const buttonTop =
    slot === "top"
      ? cardRectTop
      : slot === "middle"
        ? `calc(${cardRectTop} + ${buttonH} + (${buttonH} / 3))`
        : slot === "bottom"
          ? `calc(${cardRectTop} + (${buttonH} * 2) + ((${buttonH} / 3) * 2))`
          : cardRectTop;

  // --------------------------------
  // RectDef 用に中心Yへ変換
  // --------------------------------
  const centerY = `calc(${buttonTop} + (${buttonH} / 2))`;

  return {
    centerX,
    centerY,
    width: cardRectH,
    height: buttonH,
  };
};
