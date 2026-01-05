import { computeRectFromPoints } from "../grid/computeRectFromPoints";
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
  const { orientation, points, centerXOf, centerYOf, stepY, sizeByOrientation, heightRatio = 0.25, slot = "top" } = args;

  // 共通ヘルパーで中心やスパンを集約し、ボタン独自の高さ計算に専念する
  const { centerX, centerY: cardRectCenterY, cardH, rowSpan } = computeRectFromPoints({
    orientation,
    points,
    centerXOf,
    centerYOf,
    sizeByOrientation,
  });
  // anchors の縦方向の広がりを反映した高さを stepY とスパンから求める
  const cardRectH = `calc(${cardH} + (${stepY} * ${rowSpan}))`;

  // ボタンの高さをカード1枚分の高さと比率から計算する
  const buttonH = `calc(${cardH} * ${heightRatio})`;

  // カード枠の上端位置を、中心座標から半分の高さを引いて求める
  const cardRectTop = `calc(${cardRectCenterY} - (${cardRectH} / 2))`;

  // slot 別にボタンの上端位置を計算し、縦方向の配置を分かりやすくする
  const buttonTop =
    slot === "top"
      ? cardRectTop
      : slot === "middle"
        ? `calc(${cardRectTop} + ${buttonH} + (${buttonH} / 3))`
        : slot === "bottom"
          ? `calc(${cardRectTop} + (${buttonH} * 2) + ((${buttonH} / 3) * 2))`
          : cardRectTop;

  // 上端に高さの半分を足してボタン中心Yを求める
  const centerY = `calc(${buttonTop} + (${buttonH} / 2))`;

  return {
    centerX,
    centerY,
    width: cardRectH,
    height: buttonH,
  };
};
