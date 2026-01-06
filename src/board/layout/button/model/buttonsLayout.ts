// ファイル責務: ボタンの「配置情報のみ」をデータとして定義し、見た目や動作は他モジュールに委譲する。
// ボタンキー・向き・アンカーポイント・段(slot)を一元管理し、配列から型を導出して変更時の型整合性を保つ。

// グリッド座標(GridPoint)と向き(Orientation)の型をインポートする。
// ボタンの配置計算に必要な基本情報として使用するため、src/common/layout/grid/types から参照する。
import type { GridPoint, Orientation } from "../../../../common/layout/grid/types";
// ボタンの縦方向スロット指定（top/middle/bottom）を表す ButtonSlot 型をインポートする。
// buttonFromPoints の計算と整合させるため共通の型を使う。
import type { ButtonSlot } from "../buttonFromPoints";

/**
 * ボタン配置の定義（見た目や動作は含めない）。
 * buttonKey: 識別子、orientation: 向き、anchors: グリッド上のアンカーポイント、slot: 縦方向の段指定。
 */
export type ButtonLayout = {
  buttonKey: string;
  orientation: Orientation;
  anchors: GridPoint[];
  slot: ButtonSlot; // ★追加（上/真ん中/下）
};

// 実際のボタン配置データ。as const でリテラル型を保持し、
// satisfies ButtonLayout[] で構造の妥当性を型チェックする。
export const buttonsLayout = [
  {
    buttonKey: "back",
    orientation: "portrait",
    anchors: [{ row: 2, col: 4 }],
    slot: "top",
  },
  {
    buttonKey: "phase",
    orientation: "portrait",
    anchors: [{ row: 2, col: 4 }],
    slot: "middle",
  },
  {
    buttonKey: "statistics",
    orientation: "portrait",
    anchors: [{ row: 2, col: 4 }],
    slot: "bottom",
  },
  {
    buttonKey: "initialize",
    orientation: "portrait",
    anchors: [{ row: 3, col: 4 }],
    slot: "top",
  },
  {
    buttonKey: "import",
    orientation: "portrait",
    anchors: [{ row: 3, col: 4 }],
    slot: "middle",
  },
] as const satisfies ButtonLayout[];

/**
 * ボタンキーの union 型（"back" | "import" | ...）。
 * buttonsLayout から動的に抽出することで、ボタンを増減しても型定義が自動で同期する。
 */
export type ButtonKey = (typeof buttonsLayout)[number]["buttonKey"];
