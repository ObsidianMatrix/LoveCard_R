// ファイル責務: 捨て札ゾーンのレイアウト定義とレンダラーを保持し、ZoneDef として提供する。座標や枠スタイルと表示コンポーネントの対応をここで完結させる。

// JavaScript の仕様として、捨て札表示コンポーネント Discard を src/board/zone/Discard からインポートする。ゾーン内カードの描画責務を委譲する。
import { Discard } from "../../../zone/Discard";
// materializeZone ユーティリティをインポートする。レイアウト定義とレンダラーを ZoneDef に変換する役割を担い、src/board/elements/zones/_shared/materializeZone から取得する。
import { materializeZone } from "../_shared/materializeZone";
// ZoneDef/ZoneLayout/ZoneRenderer 型をインポートする。型安全にゾーン定義を組み立てるため src/board/elements/zones/_shared/types を参照する。
import type { ZoneDef, ZoneLayout, ZoneRenderer } from "../_shared/types";

// discardLayout は縦向きの1マスを盤面左側の2行目に配置する設定。variant は solid とし、枠線を実線で描画する。
const discardLayout: ZoneLayout = {
  kind: "discard",
  orientation: "portrait",
  anchors: [{ row: 1, col: 0 }],
  variant: "solid",
};

// discardRenderer は zoneKey を受け取り Discard コンポーネントを返す。GameState 参照は Discard 内に委譲し、ここでは zoneKey 受け渡しのみ行う。
const discardRenderer: ZoneRenderer = (zoneKey) => <Discard zoneKey={zoneKey} />;

// discardZones は上記レイアウトとレンダラーを結合した最終配列。App が直接 map できる形で公開する。
export const discardZones: ZoneDef[] = [materializeZone(discardLayout, discardRenderer)];
