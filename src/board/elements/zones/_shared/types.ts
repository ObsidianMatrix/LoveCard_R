// ファイル責務: ゾーン共通の型定義とキー生成ヘルパーを集約し、各ゾーンフォルダから再利用できるようにする。
// ここで ReactNode 型やグリッド座標型をまとめることで、ゾーン固有ファイルではレイアウトと描画だけに集中できる。

// React/TypeScript の import 構文で ReactNode 型を取得する。JSX を戻り値に含むレンダラー型を表現するために利用する。
import type { ReactNode } from "react";
// JavaScript の仕様として ES Module で型を個別に import する。盤面グリッド上の座標と向きを扱うため、src/common/layout/grid/types から GridPoint と Orientation を参照する。
import type { GridPoint, Orientation } from "../../../../common/layout/grid/types";

// ZoneKind は盤面上の枠の種類を表す。ここでは deck/discard/energyDeck/successLive/energy/hand/live/member の8種を Union 型として定義する。
export type ZoneKind =
  | "deck"
  | "discard"
  | "energyDeck"
  | "successLive"
  | "energy"
  | "hand"
  | "live"
  | "member";

// ZoneSlot は同じ種類の中で位置を示す識別子。JavaScript のリテラル Union 型で left/center/right/single を扱い、slot 未指定のときの補完にも使う。
export type ZoneSlot = "left" | "center" | "right" | "single";
// ZoneKey は kind と slot を結合した公式キー。テンプレートリテラル型で `${kind}:${slot}` を保証し、状態やレイアウトで同じ書式を使う。
export type ZoneKey = `${ZoneKind}:${ZoneSlot}`;

// ZoneLayout はレイアウト計算に必要な最低限の情報を保持する。kind/slot/orientation/anchors/variant を含め、描画ロジックやラベル生成は持たない。
export type ZoneLayout = {
  kind: ZoneKind;
  slot?: ZoneSlot;
  orientation: Orientation;
  anchors: GridPoint[];
  variant: "dashed" | "solid";
};

// ZoneRenderer は zoneKey を受け取り、ゾーン内に描画する ReactNode を返す関数の型。各ゾーン固有フォルダで具体的なコンポーネントを返す。
export type ZoneRenderer = (zoneKey: ZoneKey) => ReactNode;

// ZoneDef は App が直接 map 描画できる形の定義。layout 情報に label と content を加え、zoneKey/slot を正規化して保持する。
export type ZoneDef = {
  zoneKey: ZoneKey;
  kind: ZoneKind;
  slot: ZoneSlot;
  label: string;
  orientation: Orientation;
  anchors: ZoneLayout["anchors"];
  variant: ZoneLayout["variant"];
  content: ReactNode;
};

// normalizeZoneSlot は slot 未指定時に "single" を補完する小さなユーティリティ。JavaScript の関数定義として optional 引数を受け、戻り値を ZoneSlot で明示する。
export function normalizeZoneSlot(slot?: ZoneSlot): ZoneSlot {
  return slot ?? "single";
}

// makeZoneKey は kind と slot から ZoneKey を生成する。normalizeZoneSlot を内部で呼び出し、slot が省略されても `${kind}:${slot}` 形式を一貫させる。
export function makeZoneKey(kind: ZoneKind, slot?: ZoneSlot): ZoneKey {
  const normalizedSlot = normalizeZoneSlot(slot);
  return `${kind}:${normalizedSlot}`;
}

// zoneKeyFromLayout は ZoneLayout から直接 ZoneKey を作るヘルパー。レイアウト定義と状態キーを同期させる目的で zone 配列生成時に利用する。
export function zoneKeyFromLayout(layout: ZoneLayout): ZoneKey {
  return makeZoneKey(layout.kind, layout.slot);
}

// makeZoneLabel は kind/slot からデバッグ用ラベルを生成する。slot が single のときは kind 単体、それ以外は kind-slot 形式を返し、App の表示に使う。
export function makeZoneLabel(kind: ZoneKind, slot: ZoneSlot): string {
  return slot === "single" ? kind : `${kind}-${slot}`;
}
