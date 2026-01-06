// ファイル責務: フェーズラベル専用のレイアウト情報のみを定義し、座標や段の決定をここに閉じ込める。
// 表示内容や結合処理は別ファイルに任せ、ラベルごとの配置変更をこのファイル単体で完結できるようにする。

// JavaScript の仕様として、ラベル共通のレイアウト型 LabelLayout をインポートする。
// src/board/elements/labels/_shared/types で定義され、anchors/slot/向きの型安全性を担保する。
import type { LabelLayout } from "../_shared/types";

// phaseLabel のレイアウト定義。縦向きで右下セルに bottom 段として配置する。
// anchors にはグリッド上の基準点を 1 つ指定し、slot で縦方向の位置を決める。
export const phaseLabelLayout: LabelLayout & { labelKey: "phaseLabel" } = {
  labelKey: "phaseLabel",
  orientation: "portrait",
  anchors: [{ row: 3, col: 4 }],
  slot: "bottom",
};
