// ファイル責務: ボタンキーごとに表示コンポーネントを返すレンダラー辞書を提供する。
// 見た目の生成をここに集約し、
// レイアウト側は単に buttonRenderers から関数を取得して実行するだけで済むようにする。

// React 名前空間をインポートし、JSX を使用できるようにする。
import React from "react";
// 各ボタンのラベルコンポーネントをインポートする。
// ../../../button 配下にある Back/Phase/Initialize/Import/Statistics を使用する。
import { Back } from "../../../button/Back";
import { Phase } from "../../../button/Phase";
import { Initialize } from "../../../button/Initialize";
import { Import } from "../../../button/Import";
import { Statistics } from "../../../button/Statistics";
// ButtonKey 型をインポートする。
// buttonsLayout.ts で定義されたボタン識別子のユニオン型を使用し、辞書のキーを型安全にする。
import type { ButtonKey } from "../model/buttonsLayout";

/**
 * buttonKey を受け取り、そのボタンの見た目（ReactNode）を返すレンダラー辞書。
 * Zone の zoneRenderers と同じ役割で、条件分岐を避けてキー→コンポーネント生成関数のマッピングにする。
 */
export const buttonRenderers: Record<ButtonKey, (buttonKey: ButtonKey) => React.ReactNode> = {
  // back ボタンのレンダラー。Back コンポーネントに buttonKey を渡し、JSX を生成する。
  back: (buttonKey) => <Back buttonKey={buttonKey} />,
  // phase ボタンのレンダラー。
  phase: (buttonKey) => <Phase buttonKey={buttonKey} />,
  // initialize ボタンのレンダラー。
  initialize: (buttonKey) => <Initialize buttonKey={buttonKey} />,
  // import ボタンのレンダラー。
  import: (buttonKey) => <Import buttonKey={buttonKey} />,
  // statistics ボタンのレンダラー。
  statistics: (buttonKey) => <Statistics buttonKey={buttonKey} />,
};
