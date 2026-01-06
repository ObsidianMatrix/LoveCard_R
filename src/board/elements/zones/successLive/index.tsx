// ファイル責務: 成功ライブゾーンのレイアウトとレンダラーを管理し、ZoneDef 配列として提供する。縦に2マス分の枠と描画コンポーネントの紐付けをこのファイルに集約する。

// JavaScript の仕様として、SuccessLive コンポーネントを src/board/zone/SuccessLive からインポートする。ゾーン内で成功ライブ情報を表示する責務を委譲する。
import { SuccessLive } from "../../../zone/SuccessLive";
// materializeZone ユーティリティをインポートする。レイアウトとレンダラーを ZoneDef に変換する処理を共通化するため src/board/elements/zones/_shared/materializeZone を使う。
import { materializeZone } from "../_shared/materializeZone";
// ZoneDef/ZoneLayout/ZoneRenderer 型をインポートする。定義内容を型安全に扱うため src/board/elements/zones/_shared/types から取得する。
import type { ZoneDef, ZoneLayout, ZoneRenderer } from "../_shared/types";

// successLiveLayout は横向きで2マス分のアンカーを持つ設定。盤面右端の上段と中段に渡って配置し、variant は solid にする。
const successLiveLayout: ZoneLayout = {
  kind: "successLive",
  orientation: "landscape",
  anchors: [
    { row: 0, col: 4 },
    { row: 1, col: 4 },
  ],
  variant: "solid",
};

// successLiveRenderer は zoneKey を受け取り SuccessLive コンポーネントを返す。GameState 参照はコンポーネントに任せ、ここでは zoneKey 受け渡しのみを行う。
const successLiveRenderer: ZoneRenderer = (zoneKey) => <SuccessLive zoneKey={zoneKey} />;

// successLiveZones はレイアウトとレンダラーを結合した最終配列。App ではこの配列を連結して map 描画するだけで完了する。
export const successLiveZones: ZoneDef[] = [materializeZone(successLiveLayout, successLiveRenderer)];
