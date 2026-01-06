// ファイル責務: ZoneLayout と ZoneRenderer を合成して ZoneDef を生成する共通ファクトリーを提供する。ゾーンごとのフォルダで同じ変換処理を書く重複を避ける。
// zoneKey/slot/label の正規化と content 作成を一括で行い、呼び出し側はレイアウト定義とレンダラーを渡すだけにする。

// JavaScript の仕様として、他ファイルで宣言した型と関数を import する。ZoneDef/ZoneLayout/ZoneRenderer と正規化用のユーティリティを src/board/elements/zones/_shared/types から取得する。
import {
  makeZoneLabel,
  normalizeZoneSlot,
  zoneKeyFromLayout,
  type ZoneDef,
  type ZoneLayout,
  type ZoneRenderer,
} from "./types";

// materializeZone は単一の ZoneLayout と renderer を受け取り、ZoneDef に変換する。
// zoneKey 生成と slot 補完、ラベル作成をここでまとめるため、各ゾーンフォルダでは定義データに集中できる。
export function materializeZone(layout: ZoneLayout, renderer: ZoneRenderer): ZoneDef {
  const slot = normalizeZoneSlot(layout.slot);
  const zoneKey = zoneKeyFromLayout(layout);
  const label = makeZoneLabel(layout.kind, slot);

  return {
    zoneKey,
    kind: layout.kind,
    slot,
    label,
    orientation: layout.orientation,
    anchors: layout.anchors,
    variant: layout.variant,
    content: renderer(zoneKey),
  };
}

// materializeZones は複数レイアウトをまとめて ZoneDef 配列に変換するユーティリティ。
// map を内部で実行し、同じ renderer を複数レイアウトに適用する処理を簡潔にする。
export function materializeZones(layouts: ZoneLayout[], renderer: ZoneRenderer): ZoneDef[] {
  return layouts.map((layout) => materializeZone(layout, renderer));
}
