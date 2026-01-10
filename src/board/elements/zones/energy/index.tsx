// ファイル責務: エネルギーゾーンのレイアウト定義とレンダラーを保持し、ZoneDef 配列として公開する。横に広い枠の配置情報と描画コンポーネントの組み合わせをここでまとめる。

// JavaScript の仕様として、Energy コンポーネントを src/board/zone/Energy からインポートする。ゾーン内カード表示や操作をコンポーネントに委譲する。
import { Energy } from "../../../zone/Energy";
// materializeZone ユーティリティをインポートする。レイアウトとレンダラーを ZoneDef に変換する処理を共通化するため src/board/elements/zones/_shared/materializeZone を使用する。
import { materializeZone } from "../_shared/materializeZone";
// ZoneDef/ZoneLayout/ZoneRenderer 型をインポートする。型安全にデータを組み立てるため src/board/elements/zones/_shared/types を参照する。
import type { ZoneDef, ZoneLayout, ZoneRenderer } from "../_shared/types";

// energyLayout は縦向きで横2マス分のアンカーを持つ設定。盤面下側中央に広がる枠を表し、variant は solid にして実線で描画する。
const energyLayout: ZoneLayout = {
  kind: "energy",
  orientation: "portrait",
  anchors: [
    { row: 2, col: 1 },
    { row: 2, col: 3 },
  ],
  variant: "solid",
};

// energyRenderer は zoneKey を受け取り Energy コンポーネントを返す。GameState からのデータ取得は Energy 内に任せ、ここではキーの受け渡しだけにする。
const energyRenderer: ZoneRenderer = (zoneKey) => <Energy zoneKey={zoneKey} />;

// energyZones は上記設定を合成した ZoneDef 配列。App で配列を結合するだけで描画できる最終形として公開する。
export const energyZones: ZoneDef[] = [materializeZone(energyLayout, energyRenderer)];
