// ファイル責務: デッキゾーンのレイアウト定義とレンダラーをまとめ、ZoneDef 配列として公開する。App 側はこの配列を結合して描画するだけで済む。
// デッキ固有の座標・枠スタイル・表示コンポーネントをここで完結させ、他ゾーンと疎結合に保つ。

// JavaScript の仕様として、自作コンポーネント Deck をインポートする。src/board/zone/Deck にあり、deck ゾーン内のカード表示を担当する。
import { Deck } from "../../../zone/Deck";
// 自作ユーティリティ materializeZone をインポートする。レイアウト定義とレンダラーを ZoneDef に変換するために src/board/elements/zones/_shared/materializeZone から利用する。
import { materializeZone } from "../_shared/materializeZone";
// 共通型 ZoneDef/ZoneLayout/ZoneRenderer をインポートする。データ構造とレンダラー署名を明確にするため src/board/elements/zones/_shared/types を参照する。
import type { ZoneDef, ZoneLayout, ZoneRenderer } from "../_shared/types";

// deckLayout はデッキゾーンのアンカーポイントや向きを定義する。縦向きで盤面左上に1マス配置し、枠線は dashed にする。
const deckLayout: ZoneLayout = {
  kind: "deck",
  orientation: "portrait",
  anchors: [{ row: 0, col: 0 }],
  variant: "dashed",
};

// deckRenderer は zoneKey を受け取り Deck コンポーネントを返す。GameState と連動したカード表示を Deck 内で行うため、ここでは zoneKey を渡すだけにする。
const deckRenderer: ZoneRenderer = (zoneKey) => <Deck zoneKey={zoneKey} />;

// deckZones は deckLayout と deckRenderer を結合した ZoneDef 配列。App で map 描画するための最終形として公開する。
export const deckZones: ZoneDef[] = [materializeZone(deckLayout, deckRenderer)];
