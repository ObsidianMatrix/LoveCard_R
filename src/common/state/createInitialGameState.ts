// src/common/state/createInitialGameState.ts
// React/TypeScript の import 構文でゾーンキー一覧を取得する。盤面レイアウト（src/board/layout/zone/model/zonesLayout）で定義したキーを初期化に利用する。
import { zoneKeys } from "../../board/layout/zone/model/zonesLayout";
// React/TypeScript の import 構文で GameState 型を取得する。初期状態の戻り値を正しく型付けするため src/common/state/GameState から参照する。
import type { GameState } from "./GameState";

/**
 * ゲーム開始時の空の状態を作ります。
 * すべてのゾーンは「カード0枚」から始まります。
 */
export function createInitialGameState(): GameState {

  // zones を空配列で初期化します
  const zones = {} as GameState["zones"];

  for (const key of zoneKeys) {
    zones[key] = [];
  }

  return {
    deckName: null,
    zones,
    cardsById: {},
  };
}
