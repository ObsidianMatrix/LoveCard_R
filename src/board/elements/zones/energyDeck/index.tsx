// ファイル責務: エネルギーデッキゾーンのレイアウトとレンダラーを定義し、ZoneDef として公開する。ゾーン固有の配置と表示コンポーネントの結合をここで完結させる。

// JavaScript の仕様として、自作コンポーネント EnergyDeck を src/board/zone/EnergyDeck からインポートする。ゾーン内カード表示を担当する UI を利用する。
import { EnergyDeck } from "../../../zone/EnergyDeck";
// materializeZone ユーティリティをインポートする。レイアウトとレンダラーを ZoneDef に変換し、配列として扱うため src/board/elements/zones/_shared/materializeZone から取得する。
import { materializeZone } from "../_shared/materializeZone";
// ZoneDef/ZoneLayout/ZoneRenderer 型をインポートする。型情報を共有し、定義ミスを防ぐため src/board/elements/zones/_shared/types を参照する。
import type { ZoneDef, ZoneLayout, ZoneRenderer } from "../_shared/types";

// energyDeckLayout は縦向きの1マスを盤面左列の3行目に置く設定。variant は solid で実線枠を指定する。
const energyDeckLayout: ZoneLayout = {
  kind: "energyDeck",
  orientation: "portrait",
  anchors: [{ row: 2, col: 0 }],
  variant: "solid",
};

// energyDeckRenderer は zoneKey を受け取り EnergyDeck コンポーネントを返す。状態参照はコンポーネント内に任せ、ここでは zoneKey を渡すのみとする。
const energyDeckRenderer: ZoneRenderer = (zoneKey) => <EnergyDeck zoneKey={zoneKey} />;

// energyDeckZones は上記設定を合成した ZoneDef 配列。App に渡す最終形として公開し、他ファイルからは配列連結だけ行えばよいようにする。
export const energyDeckZones: ZoneDef[] = [materializeZone(energyDeckLayout, energyDeckRenderer)];
