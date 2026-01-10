// ファイル責務: フェーズラベルの表示内容だけを定義し、指定されたキーを受け取って JSX を返すレンダラーを提供する。
// レイアウトや結合処理は別モジュールに委譲し、ここでは純粋なプレゼンテーションを担当する。

// JavaScript の仕様として、フェーズ表示コンポーネント Phase をインポートする。
// src/board/label/Phase に定義され、ラベル内部のテキスト描画を担う。
import { Phase } from "../../../label/Phase";
// JavaScript の仕様として、レンダラーが受け取るラベルキー型をインポートする。
// _shared/types で定義された LabelDefinition に合わせ、型安全にキーを扱う。
import type { LabelDefinition } from "../_shared/types";
// JavaScript の仕様として、同フォルダの layout 定義をインポートする。
// phaseLabelLayout を使ってレイアウト情報を一元化し、renderer 側は表示内容の指定だけに集中する。
import { phaseLabelLayout } from "./layout";

// 一時的なフェーズタイトル。将来は状態管理から現在フェーズを取得するが、現状は固定文字列で描画する。
const currentPhaseTitle = "フェーズ進行：メイン";

// phaseLabel 専用の定義。layout は別ファイル、render はこの関数で Phase コンポーネントを返す。
export const phaseLabelDefinition: LabelDefinition<"phaseLabel"> = {
  layout: phaseLabelLayout,
  render: (labelKey) => <Phase labelKey={labelKey} title={currentPhaseTitle} />,
};
