import type { GridPoint, Orientation, RectDef } from "../grid/types";

/**
 * 点の配列から「1つの枠」を作ります
 *
 * - 点が1つでも複数でも同じ処理で計算します
 * - 複数点は「min〜max の範囲（長方形）」を囲む枠になります
 *   例: (1,1) と (1,4) → 1,1〜1,4 を囲む
 *
 * 計算ルール（カードサイズ固定）:
 * - 幅  = cardW + stepX * (maxCol - minCol)
 * - 高さ = cardH + stepY * (maxRow - minRow)
 * - 中心 = 両端の中心点の真ん中
 */
export const zoneFromPoints = (args: {
  orientation: Orientation;
  points: GridPoint[];

  // 中心点（あなたの式）
  centerXOf: (col: number) => string;
  centerYOf: (row: number) => string;

  // 1つ進む増分（margin + unit）
  stepX: string;
  stepY: string;

  // 向きからカード幅/高さ
  sizeByOrientation: (o: Orientation) => { w: string; h: string };
}): RectDef => {
  const {
    orientation,
    points,
    centerXOf,
    centerYOf,
    stepX,
    stepY,
    sizeByOrientation,
  } = args;

  // 想定外対策（通常はpointsは必ず1個以上で使う）
  if (points.length === 0) {
    const { w, h } = sizeByOrientation(orientation);
    return { centerX: centerXOf(0), centerY: centerYOf(0), width: w, height: h };
  }

  // min/max の範囲を作る（1点でも min=max になる）
  const rows = points.map((p) => p.row);
  const cols = points.map((p) => p.col);

  const minRow = Math.min(...rows);
  const maxRow = Math.max(...rows);
  const minCol = Math.min(...cols);
  const maxCol = Math.max(...cols);

  // 中心（両端の中心の中点）
  const minColCenterX = centerXOf(minCol);
  const maxColCenterX = centerXOf(maxCol);
  const centerX = `calc((${minColCenterX} + ${maxColCenterX}) / 2)`;

  const minRowCenterY = centerYOf(minRow);
  const maxRowCenterY = centerYOf(maxRow);
  const centerY = `calc((${minRowCenterY} + ${maxRowCenterY}) / 2)`;

  // サイズ（カード1枚分 + step * 差分）
  const { w: cardW, h: cardH } = sizeByOrientation(orientation);

  const colSpan = maxCol - minCol;
  const rowSpan = maxRow - minRow;

  const width = `calc(${cardW} + (${stepX} * ${colSpan}))`;
  const height = `calc(${cardH} + (${stepY} * ${rowSpan}))`;

  return { centerX, centerY, width, height };
};
