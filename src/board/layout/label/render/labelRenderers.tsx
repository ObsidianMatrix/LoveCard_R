// ファイル責務: ラベルキーごとに表示コンポーネントを返すレンダラー辞書を提供する。
// ラベルの実際の内容生成をここに集約し、
// レイアウト（labels.tsx）側はレンダリング関数を引くだけで済むようにする。

// React 名前空間をインポートし、JSX を使用できるようにする。
import React from "react";
// フェーズ表示用のラベルコンポーネントをインポートする。
// ../../../label/Phase で定義された Phase コンポーネントを使用する。
import { Phase } from "../../../label/Phase";
// LabelKey 型をインポートする。labels.tsx で定義されたラベル識別子のユニオン型を利用し、
// 辞書のキーを型安全にする。
import type { LabelKey } from "./labels";

// 現在のフェーズ名を仮置きするための定数。将来的には状態管理（store）ら取得する想定。
const currentPhaseTitle = "フェーズ進行：メイン";

// labelRenderers: LabelKey をキーに、そのラベルを描画する関数を値として持つ辞書。
// Record<LabelKey, (labelKey: LabelKey) => React.ReactNode> 型で、
// 各関数は labelKey を受け取り ReactNode（JSX）を返す。
export const labelRenderers: Record<LabelKey, (labelKey: LabelKey) => React.ReactNode> = {
  // phaseLabel 用のレンダラー。
  // Phase コンポーネントに labelKey と currentPhaseTitle を渡して JSX を生成する。
  phaseLabel: (labelKey) => <Phase labelKey={labelKey} title={currentPhaseTitle} />,
};
