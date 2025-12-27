import type { GridPoint, Orientation } from "../../grid/types";
import type { ButtonSlot } from "../../button/buttonFromPoints";

/**
 * ラベル配置の定義（配置だけ）
 * - anchors と slot は button と同じ指定方法
 */
export type LabelLayout = {
  labelKey: string;
  orientation: Orientation;
  anchors: GridPoint[];
  slot: ButtonSlot;
};

export const labelsLayout = [
  {
    labelKey: "phaseLabel",
    orientation: "portrait",
    anchors: [{ row: 3, col: 4 }],
    slot: "bottom",
  },
] as const satisfies LabelLayout[];
