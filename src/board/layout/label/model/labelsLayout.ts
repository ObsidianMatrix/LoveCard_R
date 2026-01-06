// ファイル責務: ラベルの「配置情報のみ」をデータとして定義し、描画や内容生成は別モジュールに委譲する。
// ラベルのキー・向き・アンカーポイント・段（slot）を一元管理し、
// 増減時に他モジュールの型が自動追従するようにする。

// グリッド座標と向きを表す型をインポートする。GridPoint と Orientation は 
// src/common/layout/grid/types で定義され、ラベル配置の基礎情報として使用する。
import type { GridPoint, Orientation } from "../../../../common/layout/grid/types";
// ボタン配置と同じ slot 指定を利用するため、ButtonSlot 型をインポートする。
// 上/中/下の段を示し、同じセルに重ねる際の位置決めに使う。
import type { ButtonSlot } from "../../button/buttonFromPoints";

/**
 * ラベル配置の定義（見た目や表示内容は含めない純粋なレイアウト情報）。
 * anchors と slot はボタンと同じ指定方法を用い、グリッド上のどこに置くかと縦方向の段を決める。
 */
export type LabelLayout = {
  labelKey: string;
  orientation: Orientation;
  anchors: GridPoint[];
  slot: ButtonSlot;
};

// 実際のラベル配置データの配列。as const によりリテラル型を保持し、
// satisfies LabelLayout[] で構造の整合性を型チェックする。
export const labelsLayout = [
  {
    // phaseLabel: フェーズ名を表示するラベル。縦向き（portrait）で配置する。
    labelKey: "phaseLabel",
    orientation: "portrait",
    anchors: [{ row: 3, col: 4 }],
    slot: "bottom",
  },
] as const satisfies LabelLayout[];
