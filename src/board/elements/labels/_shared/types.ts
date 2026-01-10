// ファイル責務: ラベル共通の型と materialize ヘルパーをまとめ、各ラベルフォルダから再利用できるようにする。
// レイアウト情報とレンダラーを結合して App がそのまま描画できる LabelDef を生成する役割を担い、
// 配置計算やコンテンツ生成の責務を分離したまま一元化する。

// React/TypeScript の import 構文で ReactNode 型を取得する。JSX を戻すレンダラー型を定義するために必要となる。
import type { ReactNode } from "react";
// JavaScript の仕様として、グリッド座標と向きを表す型をインポートする。src/common/layout/grid/types に定義された GridPoint と Orientation を利用し、
// ラベルの配置情報を正確に型付けする。
import type { GridPoint, Orientation } from "../../../../common/layout/grid/types";
// JavaScript の仕様として、段指定に ButtonSlot を使うためボタンの座標計算ユーティリティから型を読み込む。
// src/board/layout/button/buttonFromPoints に定義され、top/middle/bottom の段名を共有する目的で利用する。
import type { ButtonSlot } from "../../../layout/button/buttonFromPoints";

// LabelLayout 型: 1 ラベルが持つレイアウト情報だけを表現する。
// labelKey は識別子、orientation は縦横向き、anchors はグリッド上の基準点配列、slot は縦方向の段を示す。
export type LabelLayout = {
  labelKey: string;
  orientation: Orientation;
  anchors: GridPoint[];
  slot: ButtonSlot;
};

// LabelDefinition 型: レイアウトに加えてレンダラー関数を持ち、1 ラベルの定義を完結させる。
// render は labelKey を受け取り ReactNode を返す関数で、実際の表示内容を決定する責務を担う。
export type LabelDefinition<LabelKey extends string> = {
  layout: LabelLayout & { labelKey: LabelKey };
  render: (labelKey: LabelKey) => ReactNode;
};

// LabelDef 型: App が map 描画するための最終形。label（表示名）と content（JSX）を含み、
// レイアウト情報をそのまま持つことで描画側が追加計算を不要にする。
export type LabelDef<LabelKey extends string = string> = {
  labelKey: LabelKey;
  label: string;
  orientation: Orientation;
  anchors: GridPoint[];
  slot: ButtonSlot;
  content: ReactNode;
};

// makeLabel: labelKey から画面表示用のラベル文字列を生成する小さなヘルパー。
// 現状はキーをそのまま返すが、ここに置くことで今後の翻訳や表記揺れ吸収を一箇所に集約できる。
function makeLabel<L extends string>(labelKey: L): string {
  return labelKey;
}

// materializeLabel: LabelDefinition を受け取り、App が使う LabelDef に変換する関数。
// layout から orientation/anchors/slot を抜き出し、render(labelKey) で JSX を作成し、
// labelKey と makeLabel の結果を合わせて 1 レコードにまとめる。
export function materializeLabel<L extends string>(definition: LabelDefinition<L>): LabelDef<L> {
  const { layout, render } = definition;
  const labelKey = layout.labelKey;

  return {
    labelKey,
    label: makeLabel(labelKey),
    orientation: layout.orientation,
    anchors: layout.anchors,
    slot: layout.slot,
    content: render(labelKey),
  };
}
