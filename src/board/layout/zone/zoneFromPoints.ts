// ファイル責務: 複数のアンカーポイントからゾーンの矩形（中心座標・幅・高さ）を算出する。
// グリッド計算の共通ヘルパー computeRectFromPoints を利用し、ゾーン固有の幅高さ計算だけをここに集約する。

// 矩形計算ヘルパーをインポートする。
// src/common/layout/grid/computeRectFromPoints で中心座標・カードサイズ・スパン数を求める共通処理を利用する。
import { computeRectFromPoints } from "../../../common/layout/grid/computeRectFromPoints";
// グリッド関連の型をインポートする。
// GridPoint はアンカー座標、Orientation は向き、RectDef は戻り値となる矩形情報。
import type { GridPoint, Orientation, RectDef } from "../../../common/layout/grid/types";

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

  // 中心点（createGrid で計算した関数）
  centerXOf: (col: number) => string;
  centerYOf: (row: number) => string;

  // 1つ進む増分（margin + unit）
  stepX: string;
  stepY: string;

  // 向きからカード幅/高さ
  sizeByOrientation: (o: Orientation) => { w: string; h: string };
}): RectDef => {
  // 分割代入で引数オブジェクトから必要な値を取り出す。
  const { orientation, points, centerXOf, centerYOf, stepX, stepY, sizeByOrientation } = args;

  // 共通ヘルパーで中心やスパンを計算し、ゾーン固有のサイズ計算だけ後続で行う
  const { centerX, centerY, cardW, cardH, colSpan, rowSpan } = computeRectFromPoints({
    orientation,
    points,
    centerXOf,
    centerYOf,
    sizeByOrientation,
  });
  
  // ゾーン幅と高さを、カード1枚ぶんにスパン分の step を足す形で算出する
  const width = `calc(${cardW} + (${stepX} * ${colSpan}))`;
  const height = `calc(${cardH} + (${stepY} * ${rowSpan}))`;

  return { centerX, centerY, width, height };
};
