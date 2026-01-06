// ファイル責務: ライブゾーン（左/中央/右）のレイアウトとレンダラーを管理し、ZoneDef 配列としてまとめて公開する。3 枠分の位置情報と描画コンポーネントの結合を担当する。

// JavaScript の仕様として、Live コンポーネントを src/board/zone/Live からインポートする。各枠の中身表示をコンポーネントに任せる。
import { Live } from "../../../zone/Live";
// materializeZones ユーティリティをインポートする。複数レイアウトに同じレンダラーを適用して ZoneDef 配列へ変換する処理を共通化するため src/board/elements/zones/_shared/materializeZone を利用する。
import { materializeZones } from "../_shared/materializeZone";
// ZoneDef/ZoneLayout/ZoneRenderer 型をインポートする。レイアウトとレンダラーの構造を型で拘束するため src/board/elements/zones/_shared/types を参照する。
import type { ZoneDef, ZoneLayout, ZoneRenderer } from "../_shared/types";

// liveLayouts は右・中央・左の3 枠分のレイアウト定義。横向きでそれぞれ列1/2/3 に配置し、variant は solid とする。
const liveLayouts: ZoneLayout[] = [
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
];

// liveRenderer は zoneKey を受け取り Live コンポーネントを返す。state 参照や表示ロジックは Live 内に委譲し、ここではキーの受け渡しだけを行う。
const liveRenderer: ZoneRenderer = (zoneKey) => <Live zoneKey={zoneKey} />;

// liveZones は複数レイアウトをまとめて ZoneDef に変換した配列。App 側はこの配列を連結するだけで 3 枠すべてを描画できる。
export const liveZones: ZoneDef[] = materializeZones(liveLayouts, liveRenderer);
