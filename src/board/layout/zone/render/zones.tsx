// ファイル責務: ゾーンの配置定義（zonesLayout）と表示コンポーネント（zoneRenderers）を合成し、
// App で直接描画できる ZoneDef 配列を生成する。
// レイアウト情報、ラベル生成、zoneKey 補完をここでまとめ、UI 側が map するだけでゾーンを描画できる形にする。

// React 名前空間をインポートし、JSX/ReactNode を扱えるようにする。
import React from "react";

// Orientation 型と zonesLayout 関連の型・関数をインポートする。
// 配置データとキー生成ユーティリティを利用して ZoneDef を組み立てる。
import type { Orientation } from "../../grid/types";
import {
  zonesLayout,
  type ZoneKind,
  type ZoneLayout,
  type ZoneSlot,
  type ZoneKey,
  normalizeZoneSlot,
  zoneKeyFromLayout,
} from "../model/zonesLayout";
// ゾーンの中身を生成するレンダラー辞書をインポートする。
import { zoneRenderers } from "./zoneRenderers";

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
  // slot が無い場合は single を補って扱います
  const slot: ZoneSlot = normalizeZoneSlot(layout.slot);
  // レイアウト定義から公式のキーを作ります
  const zoneKey = zoneKeyFromLayout(layout);
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
