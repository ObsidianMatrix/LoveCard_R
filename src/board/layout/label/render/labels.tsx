// ファイル責務: ラベルのレイアウト定義（labelsLayout）と表示コンポーネント（labelRenderers）を合成し、最終的に App で消費する LabelDef 配列を生成する。
// このファイルでは配置情報・表示内容・識別キーを束ね、UI 側がそのまま描画できる形にする。

// React 名前空間をインポートし、JSX を扱えるようにする。React.ReactNode 型を利用するためにも必要。
import React from "react";

// Orientation 型をインポートする。ラベルの向きを指定するために使用するため、src/common/layout/grid/types から取得する。
import type { Orientation } from "../../../../common/layout/grid/types";
// labelsLayout（レイアウト定義）と LabelLayout 型をインポートする。配置データを基に LabelDef を組み立てる。
import { labelsLayout, type LabelLayout } from "../model/labelsLayout";
// labelRenderers をインポートする。labelKey を受け取り、具体的なラベルコンテンツ（ReactNode）を生成する関数群。
import { labelRenderers } from "./labelRenderers";

// LabelKey と LabelSlot の型エイリアス。labelsLayout からリテラル型を抽出し、他所でラベルキーや段を安全に扱えるようにする。
export type LabelKey = LabelLayout["labelKey"];
export type LabelSlot = LabelLayout["slot"];

// ラベルの最終定義を表す型。App などが参照し、描画に必要な情報（キー、ラベル文字列、向き、アンカー、段、コンテンツ）を含む。
export type LabelDef = {
  labelKey: LabelKey;
  label: string;

  orientation: Orientation;
  anchors: LabelLayout["anchors"];
  slot: LabelSlot;

  content: React.ReactNode;
};

// labelKey からラベル文字列を作るヘルパー。
// 現状はキー文字列をそのまま返すが、将来的にローカライズや表示名変換を行う場合の拡張ポイントとする。
function makeLabel(labelKey: LabelKey): string {
  return labelKey;
}

// LabelLayout と labelRenderers を合成して LabelDef を作る関数。
function materializeLabel(layout: LabelLayout): LabelDef {
  // layout.labelKey はリテラル型のため LabelKey として保持する。
  const labelKey: LabelKey = layout.labelKey;

  // LabelDef オブジェクトを生成する。
  // labelRenderers[labelKey] は labelKey を引数に ReactNode を返す関数で、content として格納する。
  return {
    labelKey,
    label: makeLabel(labelKey),
    orientation: layout.orientation,
    anchors: layout.anchors,
    slot: layout.slot,
    content: labelRenderers[labelKey](labelKey),
  };
}

// labelsLayout を Array.prototype.map で走査し、
// 各要素を materializeLabel で変換して LabelDef 配列を生成する。
// 生成された labels は App で map され、LabelFrame と組み合わせて描画される。
export const labels: LabelDef[] = labelsLayout.map(materializeLabel);
