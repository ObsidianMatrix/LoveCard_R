// ファイル責務: ラベルのアンカーポイントと段指定から、描画に必要な矩形（中心座標・幅・高さ）を算出する。
// グリッド計算の共通ヘルパー（computeRectFromPoints）を用い、
// ラベル特有の高さ・段位置・幅計算をこのファイルに集約する。

// 矩形計算ヘルパーをインポートする。
// ../grid/computeRectFromPoints でアンカー範囲から中心やカードサイズを求める処理を共通化している。
import { computeRectFromPoints } from "../grid/computeRectFromPoints";
// グリッド関連の型をインポートする。
// GridPoint はアンカー座標、Orientation は向き、RectDef は戻り値となる矩形情報。
import type { GridPoint, Orientation, RectDef } from "../grid/types";
// 段指定に ButtonSlot 型（top/middle/bottom）を使用するため、ボタンのユーティリティから型をインポートする。
import type { ButtonSlot } from "../button/buttonFromPoints";

/**
 * 点の配列から「ラベルの枠」を作る。
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

  // 幅をカード枠全体に合わせるか、カード高さと同じにするかを選ぶ
  widthMode?: "cardHeight" | "cardRectWidth";

  // 上/中/下 の段指定
  slot: ButtonSlot;
}): RectDef => {
  // 分割代入で引数を取り出し、デフォルト値を設定する。
  // heightRatio=1/6, laneHeightRatio=0.25, widthMode="cardHeight" は現状の標準設定。
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

  // computeRectFromPoints を呼び出し、アンカー範囲から中心座標・カードサイズ・スパン数を取得する。
  // 戻り値には centerX, centerY, cardW, cardH, colSpan, rowSpan が含まれ、
  // ラベル固有の寸法計算の基礎とする。
  const { centerX, centerY: cardRectCenterY, cardW, cardH, colSpan, rowSpan } = computeRectFromPoints({
    orientation,
    points,
    centerXOf,
    centerYOf,
    sizeByOrientation,
  });
  // anchors 範囲を反映した枠サイズを、スパン数と step を用いて計算する。
  // カード幅/高さにスパンぶんの stepX/stepY を足し込む。
  const cardRectW = `calc(${cardW} + (${stepX} * ${colSpan}))`;
  const cardRectH = `calc(${cardH} + (${stepY} * ${rowSpan}))`;

  // ラベル自身の高さ（見た目）をカード高さと heightRatio から算出する。
  const labelH = `calc(${cardH} * ${heightRatio})`;

  // 段の基準高さ（ボタンと揃えるための高さ）を laneHeightRatio で計算する。
  const laneH = `calc(${cardH} * ${laneHeightRatio})`;

  // カード枠全体の上端位置を、中心から高さの半分を引いて求める。
  const cardRectTop = `calc(${cardRectCenterY} - (${cardRectH} / 2))`;

  // slot の値に応じて段の上端位置を決定する。top/middle/bottom で laneH を足し込み、
  // 間に 1/3 の隙間を設ける。
  const laneTop =
    slot === "top"
      ? cardRectTop
      : slot === "middle"
        ? `calc(${cardRectTop} + ${laneH} + (${laneH} / 3))`
        : `calc(${cardRectTop} + (${laneH} * 2) + ((${laneH} / 3) * 2))`;

  // RectDef に必要な中心Yを算出する。段の上端にラベル高さの半分を足し、ラベル矩形の中心を得る。
  const centerY = `calc(${laneTop} + (${labelH} / 2))`;

  // 幅は widthMode により選択する。cardRectWidth を選ぶとアンカー範囲全体の幅、
  // cardHeight ならカード高さと同じ幅になる。
  const width = widthMode === "cardRectWidth" ? cardRectW : cardH;

  // 矩形情報を RectDef として返す。centerX は computeRectFromPoints の結果をそのまま使用し、
  // height は labelH を適用する。
  return { centerX, centerY, width, height: labelH };
};
