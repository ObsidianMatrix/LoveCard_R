// ファイル責務: メンバーゾーン（左/中央/右）のレイアウトとレンダラーを管理し、ZoneDef 配列として提供する。3 枠分の座標と表示コンポーネントの紐付けをこのファイルに集約する。

// JavaScript の仕様として、Member コンポーネントを src/board/zone/Member からインポートする。ゾーン内の表示責務をコンポーネントに委譲する。
import { Member } from "../../../zone/Member";
// materializeZones ユーティリティをインポートする。複数レイアウトを ZoneDef 配列に変換する処理を共通化するため src/board/elements/zones/_shared/materializeZone を利用する。
import { materializeZones } from "../_shared/materializeZone";
// ZoneDef/ZoneLayout/ZoneRenderer 型をインポートする。型安全に定義を組み立てるため src/board/elements/zones/_shared/types を参照する。
import type { ZoneDef, ZoneLayout, ZoneRenderer } from "../_shared/types";

// memberLayouts は右・中央・左の3 枠分のレイアウト定義。縦向きで列1/2/3 に配置し、variant は solid に設定する。
const memberLayouts: ZoneLayout[] = [
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
];

// memberRenderer は zoneKey を受け取り Member コンポーネントを返す。状態参照や描画は Member 内に任せ、ここでは zoneKey の受け渡しのみを行う。
const memberRenderer: ZoneRenderer = (zoneKey) => <Member zoneKey={zoneKey} />;

// memberZones は3 枠分のレイアウトを ZoneDef に変換した配列。App で他のゾーン配列と連結するだけで描画できる形で公開する。
export const memberZones: ZoneDef[] = materializeZones(memberLayouts, memberRenderer);
