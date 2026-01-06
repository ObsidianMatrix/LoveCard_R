// GameState から特定の情報を取り出す関数をまとめるファイルです。
// React/TypeScript の import 構文で状態とカードの型を取得する。セレクターが扱うデータ構造を src/common/state/GameState から参照する。
import type { GameState, CardId, Card } from "./GameState";
// React/TypeScript の import 構文でゾーンキー型を取得する。盤面レイアウトで定義したキーを引数に受け取るため src/board/elements/zones/_shared から参照する。
import type { ZoneKey } from "../../board/elements/zones/_shared";

// ゾーンキーに対応するカードID配列を安全に取り出します。
export function selectCardIdsInZone(state: GameState, zoneKey: ZoneKey): CardId[] {
  // 状態が必ず存在する前提ですが、念のため空配列を初期値にします。
  return state.zones[zoneKey] ?? [];
}

// ゾーン内のカード実体をまとめて取得します。
export function selectCardsInZone(state: GameState, zoneKey: ZoneKey): Card[] {
  // 先にカードID配列を取得し、辞書から中身を引いて配列に変換します。
  return selectCardIdsInZone(state, zoneKey)
    .map((cardId) => state.cardsById[cardId])
    .filter((card): card is Card => Boolean(card));
}
