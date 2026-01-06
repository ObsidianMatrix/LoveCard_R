// ファイル責務: 手札ゾーンのレイアウトとレンダラーを管理し、ZoneDef 配列を提供する。横に広い枠の配置情報と描画コンポーネントをこのファイルに集約する。

// JavaScript の仕様として、Hand コンポーネントを src/board/zone/Hand からインポートする。ゾーン内カード表示の責務をコンポーネントに委譲する。
import { Hand } from "../../../zone/Hand";
// materializeZone ユーティリティをインポートする。レイアウトとレンダラーから ZoneDef を生成する処理を共通化するため src/board/elements/zones/_shared/materializeZone を利用する。
import { materializeZone } from "../_shared/materializeZone";
// ZoneDef/ZoneLayout/ZoneRenderer 型をインポートする。型を共有し定義の漏れを防ぐため src/board/elements/zones/_shared/types を参照する。
import type { ZoneDef, ZoneLayout, ZoneRenderer } from "../_shared/types";

// handLayout は縦向きで横2マス分のアンカーを持ち、盤面最下段に広がる枠を表す。variant は dashed として破線枠を指定する。
const handLayout: ZoneLayout = {
  kind: "hand",
  orientation: "portrait",
  anchors: [
    { row: 3, col: 0 },
    { row: 3, col: 3 },
  ],
  variant: "dashed",
};

// handRenderer は zoneKey を受け取り Hand コンポーネントを返す。GameState と同期したカード表示は Hand 内に任せ、ここでは zoneKey の受け渡しに徹する。
const handRenderer: ZoneRenderer = (zoneKey) => <Hand zoneKey={zoneKey} />;

// handZones は上記設定を合成した ZoneDef 配列。App で他ゾーンと連結しやすい形で公開する。
export const handZones: ZoneDef[] = [materializeZone(handLayout, handRenderer)];
