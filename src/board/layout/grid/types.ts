/**
 * グリッド上の点
 * row: 上から下に増える（0,1,2,...）
 * col: 右から左に増える（0が一番右）
 */
export type GridPoint = {
  row: number;
  col: number;
};

/**
 * 枠の向き（縦/横）
 */
export type Orientation = "portrait" | "landscape";

/**
 * ZoneFrame に渡す四角形情報
 */
export type RectDef = {
  centerX: string;
  centerY: string;
  width: string;
  height: string;
};
