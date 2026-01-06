// ファイル責務: グリッド関連のユーティリティと型を再エクスポートし、使用側が単一の入口から取得できるようにする。
// React/TypeScript の export 構文で関数や型をまとめ直し、レイアウト計算ロジックを共通ディレクトリに整理する。
// createGrid を再エクスポートする。盤面の行数・列数から中心座標やステップを計算する関数を src/common/layout/grid/grid から提供する。
export { createGrid } from "./grid";
// computeRectFromPoints を再エクスポートする。アンカーポイントから矩形情報を算出する共通ヘルパーを src/common/layout/grid/computeRectFromPoints から提供する。
export { computeRectFromPoints } from "./computeRectFromPoints";
// グリッド関連の型をまとめて再エクスポートする。GridSpec は createGrid と同じファイルから、GridPoint/Orientation/RectDef は src/common/layout/grid/types から公開し、利用側の import を簡潔にする。
export type { GridSpec } from "./grid";
export type { GridPoint, Orientation, RectDef } from "./types";
