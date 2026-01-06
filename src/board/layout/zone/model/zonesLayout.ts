// ファイル責務: ゾーンの配置定義（アンカー・向き・枠の種類・スロット）を集約し、
// 状態管理で用いる一意キーの生成ルールを提供する。
// 見た目や中身の生成は別モジュールに委譲し、ここではレイアウトに必要な最低限のデータのみを保持する。

// グリッド座標(GridPoint)と向き(Orientation)の型をインポートする。ゾーン配置計算の基礎情報として使用するため、src/common/layout/grid/types を参照する。
import type { GridPoint, Orientation } from "../../../../common/layout/grid/types";

/**
 * 枠の種類（同じ種類は見た目やルールが同じになる想定）。
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
 * 同じ kind の中で「どの場所か」を表す値。
 */
export type ZoneSlot = "left" | "center" | "right" | "single";
/**
 * kind と slot を結合した「唯一のゾーン識別子」です。
 * - 状態管理など、どこでも同じ書式で扱います。
 */
export type ZoneKey = `${ZoneKind}:${ZoneSlot}`;

/**
 * ZoneLayout で slot が省略されたときに「single」を補う小さな関数です。
 * - 1枠しかないゾーンを明示することで、キー生成時の漏れを防ぎます。
 */
export function normalizeZoneSlot(slot?: ZoneSlot): ZoneSlot {
  return slot ?? "single";
}

/**
 * kind と slot から状態管理用の zoneKey を作ります。
 * - slot が無い場合でも single を補って決定します。
 */
export function makeZoneKey(kind: ZoneKind, slot?: ZoneSlot): ZoneKey {
  const normalizedSlot = normalizeZoneSlot(slot);
  return `${kind}:${normalizedSlot}`;
}

/**
 * ZoneLayout から zoneKey を一貫して取り出すための関数です。
 * - 配置定義と状態管理キーを常に同期させるために使います。
 */
export function zoneKeyFromLayout(layout: ZoneLayout): ZoneKey {
  return makeZoneKey(layout.kind, layout.slot);
}

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

/**
 * 盤面定義から得られる zoneKey の正式な一覧です。
 * - ゾーンを増減した際は、ここが自動的に増減します。
 */
export const zoneKeys: ZoneKey[] = zonesLayout.map(zoneKeyFromLayout);
