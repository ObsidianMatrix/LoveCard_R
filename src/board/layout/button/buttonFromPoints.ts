// ファイル責務: ボタンのアンカーポイント情報と段指定から、描画に必要な矩形（中心座標・幅・高さ）を算出する。
// グリッド計算の共通ヘルパー computeRectFromPoints を用い、ボタン特有の高さ・段位置計算をこのファイルに集約する。

// computeRectFromPoints ヘルパーをインポートする。アンカーポイントから中心座標やカードサイズ・スパンを取得する処理を共通化するため、src/common/layout/grid/computeRectFromPoints を参照する。
import { computeRectFromPoints } from "../../../common/layout/grid/computeRectFromPoints";
// グリッド関連の型をインポートする。GridPoint はアンカー座標、Orientation は向き、RectDef は戻り値となる矩形情報で、src/common/layout/grid/types に集約している。
import type { GridPoint, Orientation, RectDef } from "../../../common/layout/grid/types";

/**
 * 1枚のカード枠の中で、ボタンを置く位置を段階で表す型。
 * top/middle/bottom の3段階で縦方向の配置を切り替える。
 */
export type ButtonSlot = "top" | "middle" | "bottom";

// ボタンの矩形をアンカーポイントから計算する関数。
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
  // 分割代入で引数を取り出し、heightRatio と slot にデフォルト値を設定する。
  const { orientation, points, centerXOf, centerYOf, stepY, sizeByOrientation, heightRatio = 0.25, slot = "top" } = args;

  // computeRectFromPoints を呼び出し、アンカー範囲から中心座標とカード高さ・スパン数を取得する。
  // centerY: cardRectCenterY はカード枠全体の中心Y、cardH はカード高さ、rowSpan は縦方向のスパン数。
  const { centerX, centerY: cardRectCenterY, cardH, rowSpan } = computeRectFromPoints({
    orientation,
    points,
    centerXOf,
    centerYOf,
    sizeByOrientation,
  });
  // anchors の縦方向の広がりを反映した枠高さを計算する。カード高さに stepY × rowSpan を加算する。
  const cardRectH = `calc(${cardH} + (${stepY} * ${rowSpan}))`;

  // ボタンの高さをカード高さと比率から算出する。heightRatio によりカード高さの何倍かを指定する。
  const buttonH = `calc(${cardH} * ${heightRatio})`;

  // カード枠の上端位置を、中心から半分の高さを引いて求める。
  const cardRectTop = `calc(${cardRectCenterY} - (${cardRectH} / 2))`;

  // slot に応じてボタンの上端位置を決める。top/middle/bottom で buttonH と 1/3 の余白を積み上げて位置をずらす。
  const buttonTop =
    slot === "top"
      ? cardRectTop
      : slot === "middle"
        ? `calc(${cardRectTop} + ${buttonH} + (${buttonH} / 3))`
        : slot === "bottom"
          ? `calc(${cardRectTop} + (${buttonH} * 2) + ((${buttonH} / 3) * 2))`
          : cardRectTop;

  // ボタンの中心Yを計算する。上端に高さの半分を足して中央を求める。
  const centerY = `calc(${buttonTop} + (${buttonH} / 2))`;

  // RectDef として中心座標と幅高さを返す。幅は cardRectH（縦方向の枠高さ）を使ってボタンを縦長に配置する。
  return {
    centerX,
    centerY,
    width: cardRectH,
    height: buttonH,
  };
};
