import type { GridPoint, Orientation } from "./types";

// 点群から共通の矩形情報を計算するヘルパー
export const computeRectFromPoints = (args: {
  orientation: Orientation;
  points: GridPoint[];
  centerXOf: (col: number) => string;
  centerYOf: (row: number) => string;
  sizeByOrientation: (o: Orientation) => { w: string; h: string };
}) => {
  const { orientation, points, centerXOf, centerYOf, sizeByOrientation } = args;

  // points が空でも確実に動くように安全な配列を用意する
  const safePoints: GridPoint[] = points.length === 0 ? [{ row: 0, col: 0 }] : points;

  // 行・列の最小値と最大値を事前にまとめて取り出す
  const rows = safePoints.map((p) => p.row);
  const cols = safePoints.map((p) => p.col);

  // 両端の行・列番号を記録して差分計算に備える
  const minRow = Math.min(...rows);
  const maxRow = Math.max(...rows);
  const minCol = Math.min(...cols);
  const maxCol = Math.max(...cols);

  // 両端の中心座標を平均し、枠全体の中心座標を算出する
  const centerX = `calc((${centerXOf(minCol)} + ${centerXOf(maxCol)}) / 2)`;
  const centerY = `calc((${centerYOf(minRow)} + ${centerYOf(maxRow)}) / 2)`;

  // カード1枚分の幅・高さを取得し、行列の差分量もセットで返す
  const { w: cardW, h: cardH } = sizeByOrientation(orientation);
  const colSpan = maxCol - minCol;
  const rowSpan = maxRow - minRow;

  return { centerX, centerY, cardW, cardH, colSpan, rowSpan } as const;
};
