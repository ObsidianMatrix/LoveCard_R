// src/board/state/createInitialGameState.ts

import { zoneKeys } from "../layout/zone/model/zonesLayout";
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
