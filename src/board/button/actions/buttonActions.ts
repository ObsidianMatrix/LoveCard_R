// ファイル責務: ボタンに紐づくコールバック関数の型定義を集約し、
// レイアウト生成やアクション生成が参照する共通の契約を提供する。
// 実行ロジックは持たず、関数形とマッピング形を定めることで他ファイル間の整合性を保証する。

// src/board/layout/button/model/buttonsLayout.ts で定義された ButtonKey 型を読み込む。
// import type は TypeScript の型専用 import であり、実行時に値を持ち込まない。
// ButtonKey はボタン識別子のリテラル型で、辞書のキーとして利用する。
import type { ButtonKey } from "../../layout/button/model/buttonsLayout";

// ボタン押下時に呼び出されるコールバックの型。
// () => void は JavaScript のアロー関数型で、引数を取らず戻り値を返さないことを示す。
// クリックイベントハンドラとして利用され、呼び出し元（ButtonFrame など）から実行される。
export type ButtonAction = () => void;

// buttonKey と ButtonAction を対応付ける辞書型。
// Record<ButtonKey, ButtonAction> は TypeScript 標準ユーティリティで、
// 指定したキー集合に対する値の型を強制する。全ボタンの onClick 実装を網羅するために使用する。
export type ButtonActions = Record<ButtonKey, ButtonAction>;

// createButtonActions に渡す依存オブジェクトの型。
// App 側で実装した外部処理（戻る・フェーズ進行・Import・初期化・統計表示）をオプショナルで受け取り、
// 未指定の場合は後段で noop を割り当てる前提とする。
export type ButtonActionDeps = {
  // 戻るボタンの処理。未指定可とするため optional（?）で宣言する。
  onBack?: ButtonAction;
  // フェーズ進行ボタンの処理。
  onPhase?: ButtonAction;
  // デッキ Import ボタンの処理。
  onImport?: ButtonAction;
  // 初期化ボタンの処理。
  onInitialize?: ButtonAction;
  // 統計表示ボタンの処理。
  onStatistics?: ButtonAction;
};
