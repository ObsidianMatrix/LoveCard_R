// ファイル全体の責務: ゾーン/ボタン/ラベルの定義配列に座標計算を適用し、App が描画するだけで済む形に組み立てる。
// グリッド情報とカードサイズのヘルパーを受け取り、位置計算ロジックを一箇所にまとめて再利用性と見通しを高める。レイアウト計算はここで完結させ、App では UI フレームへの受け渡しに専念させる。

// JavaScript の仕様として、レイアウト計算に使う向きと矩形の型をインポートする。src/common/layout/grid/types にあり、座標計算の入力と出力を型安全に扱うために参照する。
import type { Orientation, RectDef } from "../../common/layout/grid/types";
// ゾーンの座標計算ユーティリティをインポートする。src/board/layout/zone/zoneFromPoints でアンカーポイントから中心座標と幅高さを算出し、ここでゾーン定義に適用する。
import { zoneFromPoints } from "../../board/layout/zone/zoneFromPoints";
// ボタンの座標計算ユーティリティをインポートする。src/board/layout/button/buttonFromPoints でボタン矩形を求め、slot 情報も ButtonDef 側の型に沿って利用する。
import { buttonFromPoints } from "../../board/layout/button/buttonFromPoints";
// ラベルの座標計算ユーティリティをインポートする。src/board/layout/label/labelFromPoints でラベル矩形を求め、ボタンと同じ段配置ルールを適用する。
import { labelFromPoints } from "../../board/layout/label/labelFromPoints";
// ゾーン定義配列とキー生成ヘルパーをインポートする。src/board/elements/zones/_shared に集約されており、レイアウトとコンテンツを含む ZoneDef を組み立ての材料として受け取る。
import { zones as zoneDefinitions, makeZoneKey, type ZoneDef, type ZoneKey } from "../../board/elements/zones/_shared";
// ボタン定義配列の生成関数と型をインポートする。src/board/elements/buttons/_shared で依存注入を経た ButtonDef を返し、ここで座標を付与する。
import { createButtons, type ButtonActionDeps, type ButtonDef, type ButtonKey } from "../../board/elements/buttons/_shared";
// ラベル定義配列と型をインポートする。src/board/elements/labels/_shared にあり、レイアウトとコンテンツが結合された LabelDef を座標付きに変換する。
import { labels as labelDefinitions, type LabelDef } from "../../board/elements/labels/_shared";

// GridAccessors 型: createGrid の戻り値から座標計算に必要な値だけを抜き出したもの。centerXOf/centerYOf と stepX/stepY を保持し、計算関数へ渡す入力をまとめる。
type GridAccessors = {
  centerXOf: (col: number) => string;
  centerYOf: (row: number) => string;
  stepX: string;
  stepY: string;
};

// SizeByOrientation 型: カードの向きに応じて幅と高さを返す関数の型。createCardSize で得られる sizeByOrientation を受け取るために定義する。
type SizeByOrientation = (orientation: Orientation) => { w: string; h: string };

// RenderableZone 型: ZoneDef に矩形情報 rect を付与した形。App 側は centerX/centerY/width/height を含むこの構造を map して枠コンポーネントへ渡すだけで描画できる。
export type RenderableZone = ZoneDef & { rect: RectDef };

// RenderableButton 型: ButtonDef に矩形情報 rect を付与した形。ボタンの配置とクリック処理が含まれるため、App で ButtonFrame を組み立てる際の完成形となる。
export type RenderableButton = ButtonDef<ButtonKey> & { rect: RectDef };

// RenderableLabel 型: LabelDef に矩形情報 rect を付与した形。ラベルの配置と表示内容が揃っており、App は枠コンポーネントに渡すだけで良い。
export type RenderableLabel = LabelDef & { rect: RectDef };

// assembleZones 関数: グリッド情報とカードサイズを受け取り、zones 定義配列それぞれに zoneFromPoints を適用して rect を付与する。
// 入力は grid と sizeByOrientation、処理はアンカー/向きから矩形算出、出力は RenderableZone 配列で、App では map して ZoneFrame/DeckZoneFrame に渡す責務だけが残る。
export function assembleZones(args: { grid: GridAccessors; sizeByOrientation: SizeByOrientation }): RenderableZone[] {
  // 分割代入で座標計算に必要なグリッド情報とカードサイズ関数を取り出す。ここで抽出することで計算ロジックが関数内に閉じ、App には配列を返すだけになる。
  const { grid, sizeByOrientation } = args;

  // zoneDefinitions の各要素に対して矩形計算を施し、RectDef を付与した RenderableZone を生成する。
  // map は JavaScript の配列変換メソッドで、入力（ZoneDef）を出力（RenderableZone）に変換する役割を担う。
  return zoneDefinitions.map((zone) => {
    // zoneFromPoints を呼び出し、ゾーンのアンカーポイントと向きから centerX/centerY/width/height を計算する。grid の centerXOf/centerYOf/stepX/stepY と sizeByOrientation を渡し、レイアウト計算の責務をここで完結させる。
    const rect = zoneFromPoints({
      orientation: zone.orientation,
      points: zone.anchors,
      centerXOf: grid.centerXOf,
      centerYOf: grid.centerYOf,
      stepX: grid.stepX,
      stepY: grid.stepY,
      sizeByOrientation,
    });

    // ZoneDef に rect を合成し、App がそのまま描画できる RenderableZone を返す。コンテンツとラベルは ZoneDef 側の責務として維持し、本ファイルでは座標付与に集中する。
    return { ...zone, rect };
  });
}

// assembleButtons 関数: ボタンの定義生成と座標計算をまとめて行い、RenderableButton 配列を返す。
// 入力はボタン動作用依存（state/dispatch 等）とグリッド情報。createButtons で content/onClick を組み立て、buttonFromPoints で rect を付ける。App はクリック処理付きの配列を ButtonFrame へ渡すだけになる。
export function assembleButtons(args: {
  grid: GridAccessors;
  sizeByOrientation: SizeByOrientation;
  deps: ButtonActionDeps;
  heightRatio?: number;
}): RenderableButton[] {
  // 分割代入で依存物とレイアウト情報を取得し、heightRatio は未指定時に標準の 0.25 を採用する。ここでデフォルトを決めることで配置高さの決定責務を一本化する。
  const { grid, sizeByOrientation, deps, heightRatio = 0.25 } = args;

  // createButtons で各ボタンの content/onClick を生成する。ButtonDefinition 配列と依存物を組み合わせ、ButtonDef の配列として受け取る。
  const buttonDefs = createButtons(deps);

  // 各 ButtonDef に buttonFromPoints の計算結果を付け足し、RenderableButton 配列として返す。map により ButtonDef（入力）→ RenderableButton（出力）へ変換する。
  return buttonDefs.map((buttonDef) => {
    // buttonFromPoints でアンカーと段(slot)から矩形を計算する。grid の centerXOf/centerYOf/stepY と sizeByOrientation を使用し、heightRatio を指定して高さを調整する。
    const rect = buttonFromPoints({
      orientation: buttonDef.orientation,
      points: buttonDef.anchors,
      centerXOf: grid.centerXOf,
      centerYOf: grid.centerYOf,
      stepY: grid.stepY,
      sizeByOrientation,
      heightRatio,
      slot: buttonDef.slot,
    });

    // ButtonDef の内容に rect を合成し、App 側が ButtonFrame の props に渡せる形で返す。座標計算を本ファイルに集約することで、App は描画責務だけに集中できる。
    return { ...buttonDef, rect };
  });
}

// assembleLabels 関数: ラベル定義配列に対して座標計算を適用し、RenderableLabel 配列を返す。
// 入力はグリッド情報とカードサイズ、任意の高さ・段間隔・幅モード。labelFromPoints を用いて矩形を付与し、App は LabelFrame への受け渡しのみで済むようにする。
export function assembleLabels(args: {
  grid: GridAccessors;
  sizeByOrientation: SizeByOrientation;
  heightRatio?: number;
  laneHeightRatio?: number;
  widthMode?: "cardHeight" | "cardRectWidth";
}): RenderableLabel[] {
  // 分割代入で必要なパラメータを取得し、デフォルト値（heightRatio=1/6、laneHeightRatio=0.25、widthMode="cardHeight"）をここで定める。配置の基準を一元化する狙い。
  const { grid, sizeByOrientation, heightRatio = 1 / 6, laneHeightRatio = 0.25, widthMode = "cardHeight" } = args;

  // labelDefinitions の各要素に対して labelFromPoints の結果を付け、RenderableLabel を組み立てる。map により LabelDef から rect 付き構造へ変換する。
  return labelDefinitions.map((labelDef) => {
    // labelFromPoints でアンカーと段(slot)から中心座標と幅高さを計算する。grid の centerXOf/centerYOf/stepX/stepY と sizeByOrientation を渡し、高さや段間隔の比率もここで設定する。
    const rect = labelFromPoints({
      orientation: labelDef.orientation,
      points: labelDef.anchors,
      centerXOf: grid.centerXOf,
      centerYOf: grid.centerYOf,
      stepX: grid.stepX,
      stepY: grid.stepY,
      sizeByOrientation,
      slot: labelDef.slot,
      heightRatio,
      laneHeightRatio,
      widthMode,
    });

    // LabelDef に rect を合成し、App が LabelFrame にそのまま渡せる RenderableLabel を返す。ラベルのコンテンツとキーは LabelDef 側の責務とし、ここでは座標付与に専念する。
    return { ...labelDef, rect };
  });
}

// makeZoneKey を再エクスポートする。ゾーンキー生成は盤面配置と状態管理の共通基盤であり、App から elements/common を経由して参照することで import 元を統一する。
export { makeZoneKey, type ZoneKey };
