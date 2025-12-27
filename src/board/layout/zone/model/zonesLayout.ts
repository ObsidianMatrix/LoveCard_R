import type { GridPoint, Orientation } from "../../grid/types";

/**
 * 枠の種類（同じ種類は見た目やルールが同じになる想定）
 */
export type ZoneKind =
  | "deck"
  | "discard"
  | "energyDeck"
  | "successLive"
  | "energy"
  | "hand"
  | "live"
  | "member";

/**
 * 同じ kind の中で「どの場所か」を表す値
 */
export type ZoneSlot = "left" | "center" | "right" | "single";

/**
 * zonesLayout では「配置に必要な情報だけ」を持つ
 * - zoneKey / label / content は持たない（生成側で作る）
 */
export type ZoneLayout = {
  kind: ZoneKind;
  slot?: ZoneSlot;
  orientation: Orientation;
  anchors: GridPoint[];
  variant: "dashed" | "solid";
};

/**
 * 盤面の配置表（定義だけ）
 * - ここには JSX や生成ロジックを書かない
 */
export const zonesLayout: ZoneLayout[] = [
  {
    kind: "deck",
    orientation: "portrait",
    anchors: [{ row: 0, col: 0 }],
    variant: "dashed",
  },
  {
    kind: "discard",
    orientation: "portrait",
    anchors: [{ row: 1, col: 0 }],
    variant: "solid",
  },
  {
    kind: "energyDeck",
    orientation: "portrait",
    anchors: [{ row: 2, col: 0 }],
    variant: "solid",
  },

  // live（右・中央・左）
  {
    kind: "live",
    slot: "right",
    orientation: "landscape",
    anchors: [{ row: 0, col: 1 }],
    variant: "solid",
  },
  {
    kind: "live",
    slot: "center",
    orientation: "landscape",
    anchors: [{ row: 0, col: 2 }],
    variant: "solid",
  },
  {
    kind: "live",
    slot: "left",
    orientation: "landscape",
    anchors: [{ row: 0, col: 3 }],
    variant: "solid",
  },

  // member（右・中央・左）
  {
    kind: "member",
    slot: "right",
    orientation: "portrait",
    anchors: [{ row: 1, col: 1 }],
    variant: "solid",
  },
  {
    kind: "member",
    slot: "center",
    orientation: "portrait",
    anchors: [{ row: 1, col: 2 }],
    variant: "solid",
  },
  {
    kind: "member",
    slot: "left",
    orientation: "portrait",
    anchors: [{ row: 1, col: 3 }],
    variant: "solid",
  },

  // 成功ライブ（縦2マス）
  {
    kind: "successLive",
    orientation: "landscape",
    anchors: [
      { row: 0, col: 4 },
      { row: 1, col: 4 },
    ],
    variant: "solid",
  },

  // エネルギー（横に広い）
  {
    kind: "energy",
    orientation: "portrait",
    anchors: [
      { row: 2, col: 1 },
      { row: 2, col: 3 },
    ],
    variant: "solid",
  },

  // 手札（横に広い）
  {
    kind: "hand",
    orientation: "portrait",
    anchors: [
      { row: 3, col: 0 },
      { row: 3, col: 3 },
    ],
    variant: "dashed",
  },
];
