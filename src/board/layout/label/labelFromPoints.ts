import { computeRectFromPoints } from "../grid/computeRectFromPoints";
import type { GridPoint, Orientation, RectDef } from "../grid/types";
import type { ButtonSlot } from "../button/buttonFromPoints";

/**
 * 点の配列から「ラベルの枠」を作る
 * - anchors と slot は button と同じ指定
 * - 段（top/middle/bottom）の位置は「基準高さ（laneH）」で計算する
 * - ラベル自体の高さ（labelH）は別にして、最後に centerY を作る
 */
export const labelFromPoints = (args: {
  orientation: Orientation;
  points: GridPoint[];

  centerXOf: (col: number) => string;
  centerYOf: (row: number) => string;

  stepX: string;
  stepY: string;

  sizeByOrientation: (o: Orientation) => { w: string; h: string };

  // ラベル自身の高さ（見た目）
  heightRatio?: number;

  // 段の基準高さ（ボタンと同じ段に揃えるため）
  // ここは button の heightRatio と同じ値にするのが基本
  laneHeightRatio?: number;

  widthMode?: "cardHeight" | "cardRectWidth";

  slot: ButtonSlot;
}): RectDef => {
  const {
    orientation,
    points,
    centerXOf,
    centerYOf,
    stepX,
    stepY,
    sizeByOrientation,
    heightRatio = 1 / 6,
    laneHeightRatio = 0.25,
    widthMode = "cardHeight",
    slot,
  } = args;

  // 共通ヘルパーで中心やスパンをまとめ、ラベル独自のサイズ計算に集中する
  const { centerX, centerY: cardRectCenterY, cardW, cardH, colSpan, rowSpan } = computeRectFromPoints({
    orientation,
    points,
    centerXOf,
    centerYOf,
    sizeByOrientation,
  });
  // anchors 範囲を反映した枠サイズを、スパンと step を用いて導出する
  const cardRectW = `calc(${cardW} + (${stepX} * ${colSpan}))`;
  const cardRectH = `calc(${cardH} + (${stepY} * ${rowSpan}))`;

  // ラベル自身の高さ（見た目）
  const labelH = `calc(${cardH} * ${heightRatio})`;

  // 段の基準高さ（ボタンと揃える）
  const laneH = `calc(${cardH} * ${laneHeightRatio})`;

  // カード枠の上端
  const cardRectTop = `calc(${cardRectCenterY} - (${cardRectH} / 2))`;

  // slot によって「段の上端」を決める（あなた指定の式・laneH基準）
  const laneTop =
    slot === "top"
      ? cardRectTop
      : slot === "middle"
        ? `calc(${cardRectTop} + ${laneH} + (${laneH} / 3))`
        : `calc(${cardRectTop} + (${laneH} * 2) + ((${laneH} / 3) * 2))`;

  // RectDef は中心Yが必要なので「段の上端 + ラベル高さ/2」
  const centerY = `calc(${laneTop} + (${labelH} / 2))`;

  const width = widthMode === "cardRectWidth" ? cardRectW : cardH;

  return { centerX, centerY, width, height: labelH };
};
