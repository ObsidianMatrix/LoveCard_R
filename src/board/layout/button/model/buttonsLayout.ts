import type { GridPoint, Orientation } from "../../grid/types";
import type { ButtonSlot } from "../buttonFromPoints";

/**
 * ボタン配置の定義（配置だけ）
 */
export type ButtonLayout = {
  buttonKey: string;
  orientation: Orientation;
  anchors: GridPoint[];
  slot: ButtonSlot; // ★追加（上/真ん中/下）
};

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
