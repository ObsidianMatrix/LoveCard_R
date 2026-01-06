// ファイル責務: 各ラベルフォルダで定義された LabelDefinition 配列を結合し、App が直接描画できる LabelDef 配列を提供する。
// レイアウト・レンダラーの合成は materializeLabel に任せ、ここでは単純な配列連結とエクスポートを行う。

// JavaScript の仕様として、LabelDef 型と materializeLabel 関数をインポートする。
// src/board/elements/labels/_shared/types にあり、レイアウトとレンダラーを合成する役割を担う。
import { materializeLabel, type LabelDef } from "./types";
// JavaScript の仕様として、phase ラベル定義をインポートする。src/board/elements/labels/phase に配置され、
// layout と render を組み合わせた LabelDefinition を提供する。
import { phaseLabelDefinition } from "../phase/renderer";

// 各ラベル定義を配列としてまとめる。as const でリテラル型を保持し、LabelKey 抽出の元とする。
const labelDefinitions = [phaseLabelDefinition] as const;

// LabelKey は labelDefinitions から labelKey を抽出したユニオン型。App や呼び出し側でキーを安全に扱うために利用する。
export type LabelKey = (typeof labelDefinitions)[number]["layout"]["labelKey"];

// materializeLabel で layout と renderer を合成し、最終的な LabelDef 配列を生成する。
// App では labels を map するだけでラベル描画が完結する。
export const labels: LabelDef<LabelKey>[] = labelDefinitions.map((definition) => materializeLabel(definition));

// 型を再エクスポートし、利用側の import 先を一本化する。
export { type LabelDef };
