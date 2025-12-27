import React from "react";

import type { Orientation } from "../../grid/types";
import { zonesLayout, type ZoneKind, type ZoneLayout, type ZoneSlot } from "../model/zonesLayout";
import { zoneRenderers } from "./zoneRenderers";

/**
 * 状態管理にも使える一意キー
 */
export type ZoneKey = `${ZoneKind}:${ZoneSlot}`;

/**
 * zoneKey を作る（状態管理側でも同じルールで作れるように）
 */
export function makeZoneKey(kind: ZoneKind, slot: ZoneSlot): ZoneKey {
  return `${kind}:${slot}`;
}

/**
 * 盤面に置く枠の定義（最終的にアプリが使う形）
 */
export type ZoneDef = {
  zoneKey: ZoneKey;
  kind: ZoneKind;
  slot: ZoneSlot;

  /**
   * ラベルは機械的に作る（デバッグ/表示用）
   * - single は kind
   * - それ以外は kind-slot
   */
  label: string;

  orientation: Orientation;
  anchors: ZoneLayout["anchors"];
  variant: ZoneLayout["variant"];

  /**
   * 枠の中身（コンポーネント）
   */
  content: React.ReactNode;
};

/**
 * label は完全自動
 */
function makeLabel(kind: ZoneKind, slot: ZoneSlot): string {
  return slot === "single" ? kind : `${kind}-${slot}`;
}

/**
 * ZoneLayout から ZoneDef を作る
 * - slot を補完
 * - zoneKey を作る
 * - label を作る
 * - content は zoneRenderers から作る（if を書かない）
 */
function materializeZone(layout: ZoneLayout): ZoneDef {
  const slot: ZoneSlot = layout.slot ?? "single";
  const zoneKey = makeZoneKey(layout.kind, slot);
  const label = makeLabel(layout.kind, slot);

  return {
    zoneKey,
    kind: layout.kind,
    slot,
    label,
    orientation: layout.orientation,
    anchors: layout.anchors,
    variant: layout.variant,
    content: zoneRenderers[layout.kind](zoneKey),
  };
}

/**
 * 外に出すのは最終形（ZoneDef）
 */
export const zones: ZoneDef[] = zonesLayout.map(materializeZone);
